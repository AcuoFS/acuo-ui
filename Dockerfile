# Stage 1 - the build process
FROM node:6.10.3 as build-deps
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install --registry=https://nexus.acuo.com/repository/npm/
RUN node_modules/.bin/webpack

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
