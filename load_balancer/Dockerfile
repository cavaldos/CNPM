# Stage 1: Build the Rust application
FROM rust:latest as builder

# Tạo thư mục làm việc
WORKDIR /usr/src/app

# Copy file manifest (Cargo.toml và Cargo.lock)
COPY Cargo.toml Cargo.lock ./

# Copy mã nguồn
COPY src ./src

# Tải dependencies và build ứng dụng
RUN cargo build --release

# Stage 2: Create a minimal runtime image
FROM debian:bookworm-slim

# Cài đặt các thư viện cần thiết
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Tạo thư mục làm việc
WORKDIR /usr/src/app

# Copy binary từ stage 1
COPY --from=builder /usr/src/app/target/release/load_balancer .

# Copy file .env vào container
COPY .env .

# Khai báo cổng nếu ứng dụng cần lắng nghe trên một cổng cụ thể
EXPOSE 8088

# Chạy ứng dụng
CMD ["./load_balancer"]