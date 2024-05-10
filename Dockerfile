FROM node:20.11.1-alpine3.19

WORKDIR /app

COPY . .

EXPOSE 3000

CMD ["node", "./build/server.js"]