FROM node

WORKDIR /usr/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3006

CMD ["./wait-for-mysql.sh", "mysql-post-container1:3308","npm", "start"]

