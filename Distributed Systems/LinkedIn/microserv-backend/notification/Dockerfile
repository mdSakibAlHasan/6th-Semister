FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3006

CMD ["./wait-for-mysql.sh", "mysql-notification-container1:3309","npm", "start"]

