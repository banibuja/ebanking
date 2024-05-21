const db = require('../../db');
const getAllTransactions = (req, res) =>{
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }
    var sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        if (data.length > 0) {
            const accountID = data[0];
            var sql = "SELECT * FROM transactions WHERE SenderAccID = ?";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (data.length > 0) {
                    console.log(data);
                } else {
                    return res.status(404).end();
                }
            });
        } else {
            return res.status(404).end();
        }
    });
}
const getCurrentAccount = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    var sql = "SELECT * FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(404).end();
        }
    });
}
const insertTransaction = (req, res) => {
    const Statusi = 1;
    const TransactionFee = 0;
    const { SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, AdditionalInfo } = req.body;
    db.query(`SELECT * FROM currentaccounts WHERE CurrentAccount IN (?, ?)`, [ReceiverAccID, SenderAccID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' }).end();
        }

        const receiverAccount = results.find(account => account.CurrentAccount === parseInt(ReceiverAccID));
        const senderAccount = results.find(account => account.CurrentAccount === parseInt(SenderAccID));
        if (!receiverAccount) {
            return res.status(404).json("receiver account not found").end();
        }
        if (!senderAccount || senderAccount.Balance < TransactionAmount) {
            return res.status(404).json("not enough balance").end();
        }
        if (!SenderAccID || !ReceiverAccID || !TransactionType || !TransactionAmount || !Currency || !AdditionalInfo) {
            return res.json("Missing parameters");
        }

        const newSenderBalance = senderAccount.Balance - TransactionAmount;
        db.query('UPDATE currentaccounts SET Balance = ? WHERE CurrentAccount = ?', [newSenderBalance, parseInt(SenderAccID)], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database update error' });
            }

            // Update receiver balance
            const receiverBalance = receiverAccount.Balance;
            const newReceiverBalance = +receiverBalance + +TransactionAmount;
            db.query('UPDATE currentaccounts SET Balance = ? WHERE CurrentAccount = ?', [newReceiverBalance, parseInt(ReceiverAccID)], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database update error' });
                }

            });
        });

    })

    db.query(`INSERT INTO transactions (SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee], (err, result) => {
        if (err) {
            return res.status(500).end();
        }
        res.status(200).json({ message: 'Transaction completed successfully' }).end();
    });
}

module.exports = {getCurrentAccount,insertTransaction};