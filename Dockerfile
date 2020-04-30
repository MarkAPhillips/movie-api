FROM node:12.16.3-alpine
WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
CMD npm run build
EXPOSE 4000