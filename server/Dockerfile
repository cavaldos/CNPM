FROM node:20-alpine

WORKDIR /usr/src/app
COPY server/package.json ./

RUN yarn global add typescript
RUN yarn install --frozen-lockfile

# Create the directory structure for proto files
RUN mkdir -p /usr/src/proto

# Copy proto files to the correct location
COPY proto/ai.proto /usr/src/proto/ai.proto

COPY server/ .
COPY server/.env ./

RUN yarn build

EXPOSE 5001
EXPOSE 3000

CMD ["node", "dist/server.js"]

# docker build -t server .
# docker run -p 3000:3000 server.