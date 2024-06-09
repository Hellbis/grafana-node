FROM node:22.2.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install && yarn build

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["yarn", "start:prod"]
