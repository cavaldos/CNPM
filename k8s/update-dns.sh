#!/bin/bash

# Script cập nhật DNS để trỏ đến Kubernetes Ingress
# Chạy trên máy local

# Lấy địa chỉ IP của Ingress Controller
INGRESS_IP=$(kubectl get svc -n ingress-nginx ingress-nginx-controller -o jsonpath='{.status.loadBalancer.ingress[0].ip}')

if [ -z "$INGRESS_IP" ]; then
  echo "Không thể lấy địa chỉ IP của Ingress Controller. Vui lòng kiểm tra lại."
  exit 1
fi

echo "Địa chỉ IP của Ingress Controller: $INGRESS_IP"
echo "Vui lòng cập nhật DNS record cho domain coursera.zapto.org để trỏ đến địa chỉ IP này."
echo "Ví dụ, nếu bạn đang sử dụng no-ip.com, hãy đăng nhập vào tài khoản và cập nhật A record."

# Kiểm tra kết nối
echo "Kiểm tra kết nối đến domain..."
echo "Đợi 60 giây để DNS được cập nhật..."
sleep 60

ping -c 3 coursera.zapto.org

echo "Cập nhật DNS hoàn tất!"
