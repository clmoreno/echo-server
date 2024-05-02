FROM node:lts-alpine

WORKDIR /app

COPY . /app

ENTRYPOINT ["node", "app.js"]