FROM node:12.6.0
WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
CMD npm run build
EXPOSE 4000