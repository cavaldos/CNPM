#!/bin/bash

# Script cài đặt các công cụ giám sát và quản lý cho Kubernetes cluster
# Chạy trên master node

# Cài đặt Helm
curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Thêm repository cho Prometheus và Grafana
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo add grafana https://grafana.github.io/helm-charts
helm repo update

# Tạo namespace cho monitoring
kubectl create namespace monitoring

# Cài đặt Prometheus
helm install prometheus prometheus-community/prometheus \
  --namespace monitoring \
  --set server.persistentVolume.enabled=false \
  --set alertmanager.persistentVolume.enabled=false

# Cài đặt Grafana
helm install grafana grafana/grafana \
  --namespace monitoring \
  --set persistence.enabled=false \
  --set adminPassword=admin \
  --set service.type=NodePort

# Lấy thông tin truy cập Grafana
GRAFANA_PASSWORD=$(kubectl get secret --namespace monitoring grafana -o jsonpath="{.data.admin-password}" | base64 --decode)
GRAFANA_URL=$(kubectl get svc --namespace monitoring grafana -o jsonpath='{.spec.ports[0].nodePort}')

echo "Prometheus và Grafana đã được cài đặt!"
echo "Truy cập Grafana tại: http://<node-ip>:$GRAFANA_URL"
echo "Username: admin"
echo "Password: $GRAFANA_PASSWORD"

# Cài đặt Kubernetes Dashboard
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml

# Tạo tài khoản admin cho Dashboard
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: admin-user
  namespace: kubernetes-dashboard
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: admin-user
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: admin-user
  namespace: kubernetes-dashboard
EOF

# Lấy token để đăng nhập vào Dashboard
TOKEN=$(kubectl -n kubernetes-dashboard create token admin-user)

echo "Kubernetes Dashboard đã được cài đặt!"
echo "Để truy cập Dashboard, chạy lệnh: kubectl proxy"
echo "Sau đó truy cập: http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/"
echo "Token để đăng nhập:"
echo "$TOKEN"
