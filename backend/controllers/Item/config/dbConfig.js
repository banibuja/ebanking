const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ebanking'
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

module.exports = connection;
