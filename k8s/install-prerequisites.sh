#!/bin/bash

# Script cài đặt các thành phần cần thiết cho Kubernetes
# Chạy trên tất cả các node (master và worker)

# Cập nhật hệ thống
apt-get update
apt-get upgrade -y

# Tắt swap (yêu cầu của Kubernetes)
swapoff -a
sed -i '/swap/s/^/#/' /etc/fstab

# Cài đặt các gói cần thiết
apt-get install -y apt-transport-https ca-certificates curl software-properties-common gnupg2

# Cài đặt Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-get install -y docker-ce docker-ce-cli containerd.io

# Cấu hình Docker sử dụng systemd
cat > /etc/docker/daemon.json <<EOF
{
  "exec-opts": ["native.cgroupdriver=systemd"],
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "100m"
  },
  "storage-driver": "overlay2"
}
EOF

mkdir -p /etc/systemd/system/docker.service.d
systemctl daemon-reload
systemctl restart docker
systemctl enable docker

# Cài đặt Kubernetes components
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat > /etc/apt/sources.list.d/kubernetes.list <<EOF
deb https://apt.kubernetes.io/ kubernetes-xenial main
EOF

apt-get update
apt-get install -y kubelet kubeadm kubectl
apt-mark hold kubelet kubeadm kubectl

# Cấu hình iptables để bridge traffic
cat > /etc/sysctl.d/k8s.conf <<EOF
net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1
EOF
sysctl --system

# Khởi động kubelet
systemctl enable kubelet
systemctl start kubelet

echo "Cài đặt các thành phần cần thiết cho Kubernetes hoàn tất!"
echo "Tiếp theo, chạy script khởi tạo master hoặc tham gia worker vào cluster."
