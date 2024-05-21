const db = require('../../db');


function generateRandomAccountNumber() {
    const prefix = '11103333'; 
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000); 
    return parseInt(prefix + randomSuffix);}

function generateFlexSaveAccountNumber() {
    const prefix = '11102222'; 
    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000); 
    return parseInt(prefix + randomSuffix); 
}

async function checkAccountExists(accountNumber) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS count FROM currentaccounts WHERE CurrentAccount = ?`, [accountNumber], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
}

module.exports = { generateRandomAccountNumber, generateFlexSaveAccountNumber, checkAccountExists };
