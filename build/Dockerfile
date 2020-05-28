FROM node:12.6.0

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

RUN useradd dockerUser

USER dockerUser

CMD npm run start:dev