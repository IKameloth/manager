FROM node:14.15.4-alpine3.12 as build

WORKDIR /app

RUN npm --global config set user root

COPY package.json .
COPY package-lock.json .

RUN npm install --unsafe-perm --production --silent

ENV NODE_ENV=production
ENV APP_NAME=autentia-admin

COPY . .

RUN npm run build

FROM nginx:stable as final
WORKDIR /web
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# CMD npm start