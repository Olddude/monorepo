FROM node:18-alpine as builder
WORKDIR /opt/monorepo
RUN apk update
RUN apk add python3 make gcc g++ bind-tools
COPY . .
RUN yarn install
RUN yarn build
WORKDIR /opt/monorepo/packages/domain-service
ENTRYPOINT [ "./entrypoint.sh" ]
