#!/bin/bash

# Script tự động cấu hình toàn bộ Kubernetes cluster
# Chạy trên máy local có thể SSH đến tất cả các server

# Đường dẫn đến SSH key
MASTER_KEY="$(pwd)/k8s/ssh_master.pem"
WORKER_KEY="$(pwd)/k8s/ssh_worker.pem"

# Kiểm tra quyền của file key
chmod 400 "$MASTER_KEY" "$WORKER_KEY"

# Thông tin các node
MASTER_IP="113.173.64.57"
MASTER_USER="ubuntu"
WORKER1_IP="3.106.223.225"
WORKER1_USER="ubuntu"
WORKER2_IP="3.106.223.224"
WORKER2_USER="ubuntu"
WORKER3_IP="3.106.223.223"
WORKER3_USER="ubuntu"

# Cấu hình SSH options
SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
MASTER_SSH="ssh $SSH_OPTS -i $MASTER_KEY"
WORKER_SSH="ssh $SSH_OPTS -i $WORKER_KEY"
MASTER_SCP="scp $SSH_OPTS -i $MASTER_KEY"
WORKER_SCP="scp $SSH_OPTS -i $WORKER_KEY"

# Tạo thư mục k8s trên tất cả các node
echo "Tạo thư mục k8s trên tất cả các node..."
$MASTER_SSH $MASTER_USER@$MASTER_IP "mkdir -p ~/k8s"
$WORKER_SSH $WORKER1_USER@$WORKER1_IP "mkdir -p ~/k8s"
$WORKER_SSH $WORKER2_USER@$WORKER2_IP "mkdir -p ~/k8s"
$WORKER_SSH $WORKER3_USER@$WORKER3_IP "mkdir -p ~/k8s"

# Copy các script cài đặt lên các node
echo "Copy các script cài đặt lên các node..."
$MASTER_SCP k8s/install-prerequisites.sh $MASTER_USER@$MASTER_IP:~/k8s/
$WORKER_SCP k8s/install-prerequisites.sh $WORKER1_USER@$WORKER1_IP:~/k8s/
$WORKER_SCP k8s/install-prerequisites.sh $WORKER2_USER@$WORKER2_IP:~/k8s/
$WORKER_SCP k8s/install-prerequisites.sh $WORKER3_USER@$WORKER3_IP:~/k8s/

$MASTER_SCP k8s/init-master.sh $MASTER_USER@$MASTER_IP:~/k8s/
$WORKER_SCP k8s/join-worker.sh $WORKER1_USER@$WORKER1_IP:~/k8s/
$WORKER_SCP k8s/join-worker.sh $WORKER2_USER@$WORKER2_IP:~/k8s/
$WORKER_SCP k8s/join-worker.sh $WORKER3_USER@$WORKER3_IP:~/k8s/

# Cài đặt các thành phần cần thiết trên tất cả các node
echo "Cài đặt các thành phần cần thiết trên master node..."
$MASTER_SSH $MASTER_USER@$MASTER_IP "cd ~/k8s && chmod +x install-prerequisites.sh && sudo ./install-prerequisites.sh"

echo "Cài đặt các thành phần cần thiết trên worker node 1..."
$WORKER_SSH $WORKER1_USER@$WORKER1_IP "cd ~/k8s && chmod +x install-prerequisites.sh && sudo ./install-prerequisites.sh"

echo "Cài đặt các thành phần cần thiết trên worker node 2..."
$WORKER_SSH $WORKER2_USER@$WORKER2_IP "cd ~/k8s && chmod +x install-prerequisites.sh && sudo ./install-prerequisites.sh"

echo "Cài đặt các thành phần cần thiết trên worker node 3..."
$WORKER_SSH $WORKER3_USER@$WORKER3_IP "cd ~/k8s && chmod +x install-prerequisites.sh && sudo ./install-prerequisites.sh"

# Khởi tạo master node
echo "Khởi tạo master node..."
$MASTER_SSH $MASTER_USER@$MASTER_IP "cd ~/k8s && chmod +x init-master.sh && sudo ./init-master.sh"

# Lấy lệnh join từ master node
echo "Lấy lệnh join từ master node..."
JOIN_COMMAND=$($MASTER_SSH $MASTER_USER@$MASTER_IP "cat /root/k8s-join-command.sh | grep 'kubeadm join'")

# Thêm các worker node vào cluster
echo "Thêm worker node 1 vào cluster..."
$WORKER_SSH $WORKER1_USER@$WORKER1_IP "cd ~/k8s && chmod +x join-worker.sh && sudo ./join-worker.sh \"$JOIN_COMMAND\""

echo "Thêm worker node 2 vào cluster..."
$WORKER_SSH $WORKER2_USER@$WORKER2_IP "cd ~/k8s && chmod +x join-worker.sh && sudo ./join-worker.sh \"$JOIN_COMMAND\""

echo "Thêm worker node 3 vào cluster..."
$WORKER_SSH $WORKER3_USER@$WORKER3_IP "cd ~/k8s && chmod +x join-worker.sh && sudo ./join-worker.sh \"$JOIN_COMMAND\""

# Kiểm tra trạng thái của cluster
echo "Kiểm tra trạng thái của cluster..."
$MASTER_SSH $MASTER_USER@$MASTER_IP "kubectl get nodes"

echo "Cấu hình Kubernetes cluster hoàn tất!"
