FROM node:21

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000 5000

CMD [ "npm","run","dev" ]

