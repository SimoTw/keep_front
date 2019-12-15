FROM node:11

RUN mkdir /app
WORKDIR /app

ENV PORT 3000

COPY package.json /app
RUN npm install

RUN mkdir /app/build
COPY /build /app/build
COPY server.js /app

EXPOSE 3000

CMD ["node", "server.js"]
