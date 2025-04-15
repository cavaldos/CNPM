FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json  ./

# Cài đặt TypeScript globally trước
RUN yarn global add typescript

# Cài đặt các phụ thuộc
RUN yarn install --frozen-lockfile

COPY ../proto ../proto

COPY . .
COPY .env ./

RUN yarn build

EXPOSE 3003
EXPOSE 5004
EXPOSE 50051

# Chạy ứng dụng
CMD ["node", "dist/server.js"]


