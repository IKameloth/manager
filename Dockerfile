FROM node:14.16.1-alpine as react-build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN yarn install --silent

COPY . ./
RUN yarn build

FROM nginx:alpine

COPY --from=react-build /app/dist /usr/share/nginx/html
#EXPOSE 3000
#CMD ["nginx", "-g", "daemon off;"]