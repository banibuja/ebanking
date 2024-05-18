const db = require('../../db');

const getCurrentAccount = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    const sql = "SELECT * FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).end();
        }
        if (data.length > 0) {
            console.log(data);
            return res.json(data).end();
        } else {
            console.log(data);
            return res.status(404).end();
        }
    });
    console.log("userID");
}
const insertTransaction = (req, res) => {
    const Statusi = 1;
    const TransactionFee = 0;
    const { SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, AdditionalInfo } = req.body;

    if (!SenderAccID || !ReceiverAccID || !TransactionType || !TransactionAmount || !Currency || !AdditionalInfo) {
        return res.json("Missing parameters");
    }
    const sql = `INSERT INTO transactions (SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee) 
                 VALUES (?, ?, ?, ?, ?, 'true', ?, ?)`;

    db.query(sql, [SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee], (err, result) => {
        if (err) {
            return res.json(err);
        }
        console.log(result);
        return res.json("Success");
    });
}

module.exports = {getCurrentAccount,insertTransaction};