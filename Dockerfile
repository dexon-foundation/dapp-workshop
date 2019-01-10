FROM node:alpine

RUN apk update && apk add --no-cache python make g++

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN yarn global add @dexon-foundation/truffle
RUN yarn global add @dexon-foundation/ganache-cli

WORKDIR /dexon-dapp-workshop-ballot
COPY . /dexon-dapp-workshop-ballot