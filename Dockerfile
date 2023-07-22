FROM node:18-alpine as builder
WORKDIR /opt/monorepo
RUN apk update
RUN apk add python3 make gcc g++
COPY . .
RUN yarn install
RUN yarn build
CMD yarn serve --listen 3000
