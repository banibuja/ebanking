// db.js

const mysql = require('mysql');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ebanking'
};

const pool = mysql.createPool(dbConfig);

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Database connected!');
    connection.release();
});

module.exports = pool;
