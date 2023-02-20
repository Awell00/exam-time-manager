FROM node:19-alpine

WORKDIR /app

COPY package.json ./
COPY . .

ENV PORT=4000
ENV MONGO_URI="mongodb+srv://Awell:19321507@cluster0.l0mlxpx.mongodb.net/?retryWrites=true&w=majority"

RUN npm install -g pnpm

RUN pnpm install

RUN npm install pm2 -g

COPY ./dist .

EXPOSE 4000

CMD ["pm2-runtime","./app.js"]


