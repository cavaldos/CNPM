FROM node:20-alpine

WORKDIR /usr/src/app
COPY package.json ./

RUN yarn global add typescript
RUN yarn install --frozen-lockfile

# Copy proto files
COPY ../proto ../proto

COPY . .
COPY .env ./

RUN yarn build

EXPOSE 5001
EXPOSE 3000

CMD ["node", "dist/server.js"]

# docker build -t server .
# docker run -p 3000:3000 server.