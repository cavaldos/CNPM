#!/bin/bash

# Script khởi tạo Kubernetes master node
# Chạy chỉ trên master node (113.173.64.57)

# Địa chỉ IP của master node
MASTER_IP="113.173.64.57"
# CIDR cho pod network
POD_CIDR="10.244.0.0/16"
# CIDR cho service network
SERVICE_CIDR="10.96.0.0/12"

# Khởi tạo master node
kubeadm init --apiserver-advertise-address=$MASTER_IP --pod-network-cidr=$POD_CIDR --service-cidr=$SERVICE_CIDR

# Cấu hình kubectl cho user hiện tại
mkdir -p $HOME/.kube
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
chown $(id -u):$(id -g) $HOME/.kube/config

# Cài đặt Calico network plugin
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml

# Tạo token để worker node tham gia vào cluster
JOIN_COMMAND=$(kubeadm token create --print-join-command)
echo "Sử dụng lệnh sau để thêm worker node vào cluster:"
echo "$JOIN_COMMAND"

# Lưu lệnh join vào file để sử dụng sau này
echo "#!/bin/bash" > /root/k8s-join-command.sh
echo "$JOIN_COMMAND" >> /root/k8s-join-command.sh
chmod +x /root/k8s-join-command.sh

# Kiểm tra trạng thái của cluster
kubectl get nodes
kubectl get pods --all-namespaces

echo "Khởi tạo Kubernetes master node hoàn tất!"
echo "Lệnh để worker node tham gia vào cluster đã được lưu vào file /root/k8s-join-command.sh"
