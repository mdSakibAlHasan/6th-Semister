FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3005

CMD ["./wait-for-mysql.sh", "mysql-container1:3307","npm", "start"]

