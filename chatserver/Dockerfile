# Sử dụng image chính thức của Node.js phiên bản được chỉ định trong package.json
FROM node:18.12.1

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Copy package.json và yarn.lock trước
COPY package.json yarn.lock ./

# Cài đặt TypeScript globally trước
RUN yarn global add typescript

# Cài đặt các phụ thuộc
RUN yarn install --frozen-lockfile

# Copy proto files
COPY ../proto ./proto

# Copy toàn bộ mã nguồn của dự án vào thư mục làm việc trong container
COPY . .
COPY .env ./

# Biên dịch ứng dụng TypeScript sang JavaScript
RUN yarn build

# Mở cổng mà ứng dụng sẽ chạy trên đó
EXPOSE 3003
EXPOSE 5004
EXPOSE 50051

# Chạy ứng dụng
CMD ["node", "dist/server.js"]


