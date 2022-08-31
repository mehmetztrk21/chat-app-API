FROM node:alpine
WORKDIR /opt/node-chat-app-api
COPY . .
RUN npm install
CMD ["node","./dist/app.js"]