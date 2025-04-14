#!/bin/bash

# Script backup và restore cho Kubernetes cluster
# Chạy trên master node

# Thư mục lưu trữ backup
BACKUP_DIR="/root/k8s-backups"
mkdir -p $BACKUP_DIR

# Hàm backup
function backup() {
  TIMESTAMP=$(date +%Y%m%d-%H%M%S)
  BACKUP_FILE="$BACKUP_DIR/k8s-backup-$TIMESTAMP.tar.gz"
  
  echo "Bắt đầu backup Kubernetes cluster..."
  
  # Backup etcd
  ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    snapshot save $BACKUP_DIR/etcd-snapshot-$TIMESTAMP.db
  
  # Backup các resource quan trọng
  mkdir -p $BACKUP_DIR/resources-$TIMESTAMP
  
  # Backup tất cả namespace
  kubectl get namespace -o yaml > $BACKUP_DIR/resources-$TIMESTAMP/namespaces.yaml
  
  # Backup các resource trong namespace coursera-app
  kubectl get all -n coursera-app -o yaml > $BACKUP_DIR/resources-$TIMESTAMP/coursera-app-resources.yaml
  kubectl get configmap -n coursera-app -o yaml > $BACKUP_DIR/resources-$TIMESTAMP/coursera-app-configmaps.yaml
  kubectl get secret -n coursera-app -o yaml > $BACKUP_DIR/resources-$TIMESTAMP/coursera-app-secrets.yaml
  kubectl get ingress -n coursera-app -o yaml > $BACKUP_DIR/resources-$TIMESTAMP/coursera-app-ingress.yaml
  
  # Nén tất cả các file backup
  tar -czf $BACKUP_FILE -C $BACKUP_DIR etcd-snapshot-$TIMESTAMP.db resources-$TIMESTAMP
  
  # Xóa các file tạm
  rm -rf $BACKUP_DIR/etcd-snapshot-$TIMESTAMP.db $BACKUP_DIR/resources-$TIMESTAMP
  
  echo "Backup hoàn tất: $BACKUP_FILE"
}

# Hàm restore
function restore() {
  if [ -z "$1" ]; then
    echo "Vui lòng cung cấp đường dẫn đến file backup."
    echo "Sử dụng: $0 restore /path/to/backup.tar.gz"
    exit 1
  fi
  
  BACKUP_FILE=$1
  RESTORE_DIR="$BACKUP_DIR/restore-temp"
  mkdir -p $RESTORE_DIR
  
  echo "Bắt đầu restore Kubernetes cluster từ $BACKUP_FILE..."
  
  # Giải nén file backup
  tar -xzf $BACKUP_FILE -C $RESTORE_DIR
  
  # Tìm file snapshot etcd
  ETCD_SNAPSHOT=$(find $RESTORE_DIR -name "etcd-snapshot-*.db" | head -1)
  
  if [ -z "$ETCD_SNAPSHOT" ]; then
    echo "Không tìm thấy file snapshot etcd trong backup."
    exit 1
  fi
  
  # Dừng kubelet và các container khác
  systemctl stop kubelet
  docker stop $(docker ps -q)
  
  # Restore etcd
  ETCDCTL_API=3 etcdctl --endpoints=https://127.0.0.1:2379 \
    --cacert=/etc/kubernetes/pki/etcd/ca.crt \
    --cert=/etc/kubernetes/pki/etcd/server.crt \
    --key=/etc/kubernetes/pki/etcd/server.key \
    snapshot restore $ETCD_SNAPSHOT \
    --data-dir=/var/lib/etcd-restore
  
  # Cập nhật đường dẫn etcd
  mv /var/lib/etcd /var/lib/etcd.bak
  mv /var/lib/etcd-restore /var/lib/etcd
  
  # Khởi động lại kubelet và các dịch vụ
  systemctl start kubelet
  
  echo "Restore hoàn tất. Cluster đang khởi động lại..."
  
  # Xóa thư mục tạm
  rm -rf $RESTORE_DIR
}

# Hàm liệt kê các backup
function list_backups() {
  echo "Danh sách các backup hiện có:"
  ls -lh $BACKUP_DIR/*.tar.gz 2>/dev/null || echo "Không có backup nào."
}

# Xử lý tham số
case "$1" in
  backup)
    backup
    ;;
  restore)
    restore "$2"
    ;;
  list)
    list_backups
    ;;
  *)
    echo "Sử dụng: $0 {backup|restore|list}"
    echo "  backup: Tạo backup mới"
    echo "  restore /path/to/backup.tar.gz: Khôi phục từ file backup"
    echo "  list: Liệt kê các backup hiện có"
    exit 1
    ;;
esac

exit 0
