#!/bin/bash

# Dừng và xóa container Nginx nếu đã tồn tại
docker-compose -f nginx.yml down

# Xây dựng và khởi động container Nginx
docker-compose -f nginx.yml up -d --build

# Hiển thị trạng thái
docker-compose -f nginx.yml ps

# Hiển thị log
docker-compose -f nginx.yml logs nginx-load-balancer
