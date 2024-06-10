const jwt = require('jsonwebtoken');
const db = require('../../db');


const insertLog = async (userId, action, details) => {
    try {
        const timestamp = new Date().toISOString(); 
        await new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO logs (userId, action, details, timestamp) VALUES (?, ?, ?, ?)`, 
                [userId, action, details, timestamp], 
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );
        });
    } catch (error) {
        console.error('Error inserting log:', error);
    }
};

const getLogs = (req, res) => {
    const sql = "SELECT * FROM logs";

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching logs:", err);
            return res.status(500).send("Error fetching logs");
        }
        res.json(results);
    });
};


module.exports = {insertLog, getLogs}