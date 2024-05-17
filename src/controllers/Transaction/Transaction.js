const db = require('../../db');

const getCurrentAccount = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    const sql = "SELECT * FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
}
const insertTransaction = (req, res) => {
    const { SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, AdditionalInfo, TransactionFee} = req.body;

    if (!SenderAccID || !ReceiverAccID || !TransactionType || !TransactionAmount || !Currency || !AdditionalInfo || !TransactionFee) {
        return res.json("Missing parameters");
    }

    const sql = `INSERT INTO transactions (SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee) 
                 VALUES (?, ?, ?, ?, ?, 'true', ?, ?)`;

    db.query(sql, [SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee], (err, result) => {
        if (err) {
            return res.json("Error");
        }
        return res.json("Success");
    });
}

module.exports = {getCurrentAccount,insertTransaction};