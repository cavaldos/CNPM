#!/bin/bash

# Script triển khai ứng dụng lên Kubernetes cluster
# Chạy trên master node

# Đường dẫn đến thư mục chứa mã nguồn
APP_DIR="/root/app"

# Tạo namespace
kubectl apply -f $APP_DIR/k8s/deployments/namespace.yaml

# Cài đặt Nginx Ingress Controller
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/cloud/deploy.yaml

# Build Docker images
cd $APP_DIR
docker build -t client-coursera:latest -f client/Dockerfile ./client
docker build -t server-coursera:latest -f server/Dockerfile ./server
docker build -t chatserver-coursera:latest -f chatserver/Dockerfile ./chatserver

# Triển khai các ứng dụng
kubectl apply -f $APP_DIR/k8s/deployments/client-deployment.yaml
kubectl apply -f $APP_DIR/k8s/deployments/server-deployment.yaml
kubectl apply -f $APP_DIR/k8s/deployments/chatserver-deployment.yaml

# Đợi các pod khởi động
echo "Đợi các pod khởi động..."
sleep 30

# Triển khai Ingress
kubectl apply -f $APP_DIR/k8s/deployments/nginx-ingress.yaml

# Kiểm tra trạng thái
kubectl get pods -n coursera-app
kubectl get services -n coursera-app
kubectl get ingress -n coursera-app

echo "Triển khai ứng dụng lên Kubernetes hoàn tất!"
echo "Bạn có thể truy cập ứng dụng tại: http://coursera.zapto.org"
