FROM node:lts-alpine

ADD . /app/
WORKDIR /app

RUN yarn

EXPOSE 3000

#Démarrer l'application Node.js
CMD ["yarn", "dev"]