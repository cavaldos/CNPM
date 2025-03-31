# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 g++ make

COPY package.json ./
RUN yarn install

COPY . .

# Thiết lập biến môi trường build-time (nếu cần)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN yarn build

# Stage 2: Serve the app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn install --production

EXPOSE 5173
EXPOSE 8080

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173"]
