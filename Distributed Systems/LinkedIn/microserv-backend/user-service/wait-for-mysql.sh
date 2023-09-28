#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until node -e "const mysql = require('mysql2'); const connection = mysql.createConnection({ host: '$host', user: 'root', password: 'password' }); connection.connect(err => { if (err) { console.error('MySQL is unavailable - sleeping'); setTimeout(() => {}, 1000); } else { connection.end(); console.log('MySQL is up - executing command'); process.exit(0); } });"; do
  sleep 1
done

exec $cmd
