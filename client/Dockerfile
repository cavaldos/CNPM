# Stage 1: Build the app
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 g++ make

COPY package.json ./
RUN yarn install && yarn add --force esbuild


COPY .env ./
COPY . .

RUN yarn build

# Stage 2: Serve the app
FROM node:20-alpine

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./

RUN yarn install --production && yarn add --force esbuild

EXPOSE 5173
EXPOSE 8081
EXPOSE 80
EXPOSE 81

# CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173", "--strictPort", "true"]

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173"]
# CMD ["yarn", "preview"]
