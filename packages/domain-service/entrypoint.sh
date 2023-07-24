#!/usr/bin/env sh

echo "HOSTNAME: "$(hostname)

ping -c 4 identity-service

node --inspect=0.0.0.0:9229 ./dist/index.js
