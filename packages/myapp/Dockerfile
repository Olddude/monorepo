FROM node:18-alpine as builder
WORKDIR /opt/monorepo
RUN apk update
RUN apk add python3 make gcc g++ git
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn setup
RUN yarn build
WORKDIR /opt/monorepo/packages/myapp
CMD node --inspect=0.0.0.0:9229 ./dist/index.js
