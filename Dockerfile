FROM node:14.16.1-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN yarn install --silent

# add app
COPY . ./

# start app
CMD ["yarn", "start"]