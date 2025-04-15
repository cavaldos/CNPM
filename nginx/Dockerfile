FROM nginx:alpine

# Cài đặt các công cụ cần thiết
RUN apk add --no-cache curl bash

# Xóa cấu hình mặc định
RUN rm /etc/nginx/conf.d/default.conf

# Tạo thư mục logs và cấu hình quyền truy cập
RUN mkdir -p /var/log/nginx && \
    chmod -R 755 /var/log/nginx && \
    chown -R nginx:nginx /var/log/nginx

# Tối ưu hóa cấu hình Nginx
RUN echo 'worker_processes auto;' > /etc/nginx/nginx.conf \
    && echo 'worker_rlimit_nofile 65535;' >> /etc/nginx/nginx.conf \
    && echo 'events { worker_connections 4096; }' >> /etc/nginx/nginx.conf \
    && echo 'http {' >> /etc/nginx/nginx.conf \
    && echo '    include       /etc/nginx/mime.types;' >> /etc/nginx/nginx.conf \
    && echo '    default_type  application/octet-stream;' >> /etc/nginx/nginx.conf \
    && echo '    sendfile        on;' >> /etc/nginx/nginx.conf \
    && echo '    tcp_nopush     on;' >> /etc/nginx/nginx.conf \
    && echo '    tcp_nodelay    on;' >> /etc/nginx/nginx.conf \
    && echo '    keepalive_timeout  65;' >> /etc/nginx/nginx.conf \
    && echo '    gzip  on;' >> /etc/nginx/nginx.conf \
    && echo '    include /etc/nginx/conf.d/*.conf;' >> /etc/nginx/nginx.conf \
    && echo '}' >> /etc/nginx/nginx.conf

# Copy cấu hình của chúng ta
COPY conf.d/load-balancer.conf /etc/nginx/conf.d/

# Tạo script kiểm tra sức khỏe
RUN echo '#!/bin/bash' > /healthcheck.sh \
    && echo 'curl -f http://localhost/nginx_status || exit 1' >> /healthcheck.sh \
    && chmod +x /healthcheck.sh

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 CMD /healthcheck.sh

# Expose port 80
EXPOSE 80

# Chạy Nginx ở foreground
CMD ["nginx", "-g", "daemon off;"]
