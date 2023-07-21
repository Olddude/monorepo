FROM node:18-alpine as builder
WORKDIR /opt/monorepo
COPY . .
RUN apk update
RUN apk add python3 make gcc g++ git
RUN yarn install --frozen-lockfile
RUN yarn setup
RUN yarn build
CMD yarn serve
