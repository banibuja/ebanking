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
function generateRandomPassword() {
    const length = 10; 
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; ++i) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

async function checkCurrentAccountExists(accountNumber) {
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
async function checkSaveAccountExists(accountNumber) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS count FROM savingsaccounts WHERE SavingAccount = ?`, [accountNumber], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
}
async function checkCardExists(cardId) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT COUNT(*) AS count FROM cards WHERE CardID = ?`, [cardId], (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result[0].count > 0);
            }
        });
    });
}




module.exports = { generateRandomAccountNumber, generateFlexSaveAccountNumber, checkCurrentAccountExists, checkSaveAccountExists, checkCardExists, generateRandomPassword };
