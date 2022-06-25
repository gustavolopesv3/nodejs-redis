FROM node:16.15.0

WORKDIR /usr/app

COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "dev"]