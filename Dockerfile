FROM node:14.16.1-alpine as react-build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN yarn install --silent

ENV NODE_ENV=production
ENV APP_NAME=autentia-admin

COPY . ./
RUN yarn build

FROM nginx:stable as final
WORKDIR /web
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/dist .

# CMD npm start
