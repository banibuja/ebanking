// // db.js

// const mysql = require('mysql');

// const dbConfig = {
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'ebanking'
// };

// const pool = mysql.createPool(dbConfig);

// pool.getConnection((err, connection) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Database connected!');
//     connection.release();
// });

// module.exports = pool;

const mysql = require('mysql2/promise');

// Konfigurimi i bazës së të dhënave
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ebanking'
};

// Krijo një pool të lidhjeve
const pool = mysql.createPool(dbConfig);

// Funksioni për të marrë një lidhje nga pool-i
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected!');
        return connection;
    } catch (err) {
        console.error('Error connecting to database:', err);
        throw err; // Hedh përjashtim nëse ndodhi ndonjë gabim
    }
}
// backend/config/db.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ebanking', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Set to true if you want to log SQL queries
});

module.exports = sequelize;


// Eksporto pool dhe funksionin për të marrë lidhje
module.exports = { pool, getConnection };
