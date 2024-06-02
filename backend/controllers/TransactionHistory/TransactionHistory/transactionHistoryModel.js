// Example model structure if needed
const db = require('../../../db');

const TransactionHistory = {
    getAll: (callback) => {
        db.query('SELECT * FROM transactionhistory', callback);
    },
    insert: (data, callback) => {
        const { SenderAccID, ReceiverAccID, TransactionAmount, TransactionDate } = data;
        db.query('INSERT INTO transactionhistory (SenderAccID, ReceiverAccID, TransactionAmount, TransactionDate) VALUES (?, ?, ?, ?)', 
        [SenderAccID, ReceiverAccID, TransactionAmount, TransactionDate], callback);
    }
};

module.exports = TransactionHistory;
