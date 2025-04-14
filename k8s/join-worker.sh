#!/bin/bash

# Script để worker node tham gia vào Kubernetes cluster
# Chạy trên các worker node (3.106.223.225, 3.106.223.224, 3.106.223.223)

# Kiểm tra xem đã có lệnh join hay chưa
if [ -z "$1" ]; then
  echo "Vui lòng cung cấp lệnh join từ master node."
  echo "Sử dụng: $0 \"kubeadm join 113.173.64.57:6443 --token xxx --discovery-token-ca-cert-hash sha256:xxx\""
  exit 1
fi

# Thực hiện lệnh join
$1

echo "Worker node đã tham gia vào cluster!"
echo "Kiểm tra trạng thái của node trên master node bằng lệnh: kubectl get nodes"
