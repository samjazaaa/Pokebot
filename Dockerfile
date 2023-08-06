FROM node:latest

RUN mkdir -p /usr/src/bot

WORKDIR /usr/src/bot

COPY . .

RUN npm install
RUN npm run build

CMD ["node", "dist/Bot.js"]