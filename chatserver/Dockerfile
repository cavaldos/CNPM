FROM node:20-alpine

WORKDIR /usr/src/app

COPY chatserver/package.json  ./

# Cài đặt TypeScript globally trước
RUN yarn global add typescript

# Cài đặt các phụ thuộc
RUN yarn install --frozen-lockfile

# Create the directory structure for proto files
RUN mkdir -p /usr/src/proto

# Copy proto files to the correct location
COPY proto/ai.proto /usr/src/proto/ai.proto

COPY chatserver/ .
COPY chatserver/.env ./

RUN yarn build

EXPOSE 3003
EXPOSE 5004
EXPOSE 50051

# Chạy ứng dụng
CMD ["node", "dist/server.js"]


