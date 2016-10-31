FROM node:latest

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN ls

RUN npm install

EXPOSE 8080

RUN npm run dev