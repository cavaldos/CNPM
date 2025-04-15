# Hướng dẫn cấu hình và quản lý Kubernetes Cluster

Thư mục này chứa các script và file cấu hình để thiết lập và quản lý Kubernetes cluster với 1 master node và 3 worker node.

## Thông tin cấu hình

- **Master Node**: 113.173.64.57
- **Worker Nodes**:
  - Worker 1: 3.106.223.225
  - Worker 2: 3.106.223.224
  - Worker 3: 3.106.223.223

## SSH Keys

Thư mục này chứa các file SSH key để kết nối đến các server:

- **ssh_master.pem**: SSH key để kết nối đến master node
- **ssh_worker.pem**: SSH key để kết nối đến các worker node

Các script đã được cấu hình để sử dụng các key này khi kết nối SSH.

## Cấu trúc thư mục

```
k8s/
├── install-prerequisites.sh    # Cài đặt các thành phần cần thiết cho K8s
├── init-master.sh              # Khởi tạo master node
├── join-worker.sh              # Script để worker node tham gia vào cluster
├── setup-cluster.sh            # Script tự động cấu hình toàn bộ cluster
├── deploy-app.sh               # Triển khai ứng dụng lên Kubernetes
├── update-dns.sh               # Cập nhật DNS để trỏ đến Kubernetes Ingress
├── install-monitoring.sh       # Cài đặt công cụ giám sát (Prometheus, K8s Dashboard)
├── backup-restore.sh           # Script backup và restore cluster
├── ssh_master.pem              # SSH key để kết nối đến master node
├── ssh_worker.pem              # SSH key để kết nối đến các worker node
├── deployments/                # Thư mục chứa các file YAML để triển khai ứng dụng
│   ├── namespace.yaml          # Tạo namespace cho ứng dụng
│   ├── client-deployment.yaml  # Triển khai client service
│   ├── server-deployment.yaml  # Triển khai server service
│   ├── chatserver-deployment.yaml # Triển khai chatserver service
│   └── nginx-ingress.yaml      # Cấu hình Ingress để định tuyến traffic
└── README.md                   # File hướng dẫn này
```

## Hướng dẫn sử dụng

### 1. Cài đặt Kubernetes Cluster

#### Cách 1: Cài đặt tự động toàn bộ cluster

Script `setup-cluster.sh` sẽ tự động cấu hình toàn bộ cluster, bao gồm:
- Copy các script cần thiết lên tất cả các node
- Cài đặt các thành phần cần thiết trên tất cả các node
- Khởi tạo master node
- Thêm các worker node vào cluster

```bash
# Cấp quyền thực thi cho script
chmod +x k8s/setup-cluster.sh

# Chạy script
./k8s/setup-cluster.sh
```

#### Cách 2: Cài đặt thủ công từng bước

Nếu bạn muốn kiểm soát quá trình cài đặt, bạn có thể thực hiện từng bước:

1. **Cài đặt các thành phần cần thiết trên tất cả các node**:

   ```bash
   # Trên master node
   scp -i k8s/ssh_master.pem k8s/install-prerequisites.sh ubuntu@113.173.64.57:~/
   ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "chmod +x install-prerequisites.sh && sudo ./install-prerequisites.sh"

   # Trên worker node 1
   scp -i k8s/ssh_worker.pem k8s/install-prerequisites.sh ubuntu@3.106.223.225:~/
   ssh -i k8s/ssh_worker.pem ubuntu@3.106.223.225 "chmod +x install-prerequisites.sh && sudo ./install-prerequisites.sh"

   # Tương tự cho worker node 2 và 3
   ```

2. **Khởi tạo master node**:

   ```bash
   scp -i k8s/ssh_master.pem k8s/init-master.sh ubuntu@113.173.64.57:~/
   ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "chmod +x init-master.sh && sudo ./init-master.sh"
   ```

3. **Lấy lệnh join từ master node**:

   ```bash
   JOIN_COMMAND=$(ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "cat /root/k8s-join-command.sh | grep 'kubeadm join'")
   ```

4. **Thêm các worker node vào cluster**:

   ```bash
   # Trên worker node 1
   scp -i k8s/ssh_worker.pem k8s/join-worker.sh ubuntu@3.106.223.225:~/
   ssh -i k8s/ssh_worker.pem ubuntu@3.106.223.225 "chmod +x join-worker.sh && sudo ./join-worker.sh \"$JOIN_COMMAND\""

   # Tương tự cho worker node 2 và 3
   ```

### 2. Triển khai ứng dụng lên Kubernetes

1. **Copy các file cấu hình lên master node**:

   ```bash
   scp -i k8s/ssh_master.pem -r k8s/deployments ubuntu@113.173.64.57:~/
   scp -i k8s/ssh_master.pem k8s/deploy-app.sh ubuntu@113.173.64.57:~/
   ```

2. **Chạy script triển khai ứng dụng**:

   ```bash
   ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "chmod +x deploy-app.sh && sudo ./deploy-app.sh"
   ```

### 3. Cập nhật DNS

Sau khi triển khai ứng dụng, bạn cần cập nhật DNS để trỏ đến Kubernetes Ingress:

```bash
scp -i k8s/ssh_master.pem k8s/update-dns.sh ubuntu@113.173.64.57:~/
ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "chmod +x update-dns.sh && sudo ./update-dns.sh"
```

### 4. Cài đặt công cụ giám sát (tùy chọn)

Để giám sát cluster, bạn có thể cài đặt Prometheus và Kubernetes Dashboard:

```bash
scp -i k8s/ssh_master.pem k8s/install-monitoring.sh ubuntu@113.173.64.57:~/
ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "chmod +x install-monitoring.sh && sudo ./install-monitoring.sh"
```

### 5. Backup và restore cluster

#### Backup cluster

```bash
scp -i k8s/ssh_master.pem k8s/backup-restore.sh ubuntu@113.173.64.57:~/
ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "chmod +x backup-restore.sh && sudo ./backup-restore.sh backup"
```

#### Restore cluster từ backup

```bash
ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "sudo ./backup-restore.sh restore /path/to/backup.tar.gz"
```

#### Liệt kê các backup hiện có

```bash
ssh -i k8s/ssh_master.pem ubuntu@113.173.64.57 "sudo ./backup-restore.sh list"
```

## Kiểm tra trạng thái cluster

Để kiểm tra trạng thái của cluster, bạn có thể sử dụng các lệnh sau trên master node:

```bash
# Kiểm tra các node
kubectl get nodes

# Kiểm tra các pod
kubectl get pods --all-namespaces

# Kiểm tra các service
kubectl get services --all-namespaces

# Kiểm tra các deployment
kubectl get deployments --all-namespaces

# Kiểm tra các ingress
kubectl get ingress --all-namespaces
```

## Truy cập ứng dụng

Sau khi triển khai thành công, bạn có thể truy cập ứng dụng tại:

- **Frontend**: http://coursera.zapto.org
- **API Server**: http://coursera.zapto.org/api
- **Chat Server**: http://coursera.zapto.org/chat
- **Socket.IO**: http://coursera.zapto.org/socket.io

## Truy cập Dashboard (nếu đã cài đặt)

1. Khởi động proxy:

   ```bash
   kubectl proxy
   ```

2. Truy cập Dashboard tại:

   ```
   http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/
   ```

3. Sử dụng token để đăng nhập (được hiển thị sau khi chạy script install-monitoring.sh)

## Xử lý sự cố

### 1. Kiểm tra log của pod

```bash
kubectl logs <pod-name> -n <namespace>
```

### 2. Kiểm tra mô tả của pod

```bash
kubectl describe pod <pod-name> -n <namespace>
```

### 3. Kiểm tra log của kubelet

```bash
journalctl -u kubelet
```

### 4. Kiểm tra trạng thái của các thành phần trong cluster

```bash
kubectl get componentstatuses
```

### 5. Khởi động lại kubelet

```bash
systemctl restart kubelet
```

## Lưu ý quan trọng

1. **Bảo mật**: Các script này chứa thông tin nhạy cảm như địa chỉ IP và thông tin xác thực. Hãy đảm bảo chỉ những người được ủy quyền mới có thể truy cập.

2. **Tài nguyên**: Kubernetes yêu cầu tài nguyên đáng kể. Mỗi node nên có ít nhất 2 CPU, 2GB RAM và 20GB disk space.

3. **Kết nối mạng**: Các node phải có thể kết nối với nhau qua mạng. Đảm bảo các port cần thiết được mở (6443, 2379-2380, 10250-10252, 30000-32767).

4. **Phiên bản**: Các script này được viết cho Kubernetes v1.27+. Nếu bạn sử dụng phiên bản khác, có thể cần điều chỉnh.

5. **Backup**: Thực hiện backup thường xuyên để tránh mất dữ liệu.

## Tài liệu tham khảo

- [Kubernetes Documentation](https://kubernetes.io/docs/home/)
- [kubeadm Documentation](https://kubernetes.io/docs/reference/setup-tools/kubeadm/)
- [Nginx Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
- [Prometheus Documentation](https://prometheus.io/docs/introduction/overview/)
