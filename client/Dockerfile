# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 g++ make

COPY package.json ./
RUN yarn install && yarn add --force esbuild

# Copy env file first so it's available during build
COPY .env ./
COPY . .

# Không cần chỉ định từng biến một, Vite sẽ tự đọc file .env
# khi build nếu file đã được copy vào container

RUN yarn build

# Stage 2: Serve the app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn install --production

EXPOSE 5173
EXPOSE 8081
EXPOSE 80

# Đảm bảo chạy dưới quyền root
USER root

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173"]
