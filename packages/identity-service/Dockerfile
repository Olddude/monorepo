FROM node:18-alpine as builder
WORKDIR /opt/monorepo
RUN apk update
RUN apk add python3 make gcc g++
COPY . .
RUN yarn install
RUN yarn build
WORKDIR /opt/monorepo/packages/identity-service
CMD node --inspect=0.0.0.0:9229 ./dist/index.js
