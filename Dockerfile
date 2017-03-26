FROM node:latest

COPY . /usr/src/app
WORKDIR /usr/src/app

RUN npm install
RUN node_modules/.bin/webpack

EXPOSE 8080

CMD cd dist && python -m SimpleHTTPServer 8080
