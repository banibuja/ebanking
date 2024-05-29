const db = require('../../db');
// const sendTransactionEmail = require('../Transaction/sendEmailTransaction');

const getCurrentAccount = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    const sql = "SELECT * FROM currentaccounts WHERE UserID = ?";
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
};

const getSavingsAccounts = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    const sql = "SELECT * FROM savingsaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json(err).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(404).end();
        }
    });
};

const insertSaveTransaction = (req, res) => {
    const { SenderAccID, TransactionAmount, ReceiverAccID} = req.body;

    if (!SenderAccID || !TransactionAmount || !ReceiverAccID) {
        return res.status(400).json({ error: "Missing parameters" }).end();
    }

    db.query('SELECT * FROM currentaccounts WHERE CurrentAccount = ?', [SenderAccID], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' }).end();
        }

        const senderAccount = results.find(account => account.CurrentAccount === parseInt(SenderAccID));
        if (!senderAccount) {
            return res.status(404).json({ error: "Sender account not found" }).end();
        }
        if (senderAccount.Balance < TransactionAmount) {
            return res.status(400).json({ error: "Not enough balance" }).end();
        }

        db.query(`SELECT * FROM savingsaccounts WHERE SavingsType = ?`, [ReceiverAccID], (err, receiverResults) => {
            if (err) {
                return res.status(500).json({ error: 'Database query error' }).end();
            }

            const receiverAccount = receiverResults.find(account => account['SavingsType'] === parseInt(ReceiverAccID));
            if (!receiverAccount) {
                return res.status(404).json({ error: "Receiver account not found" }).end();
            }

            const newSenderBalance = senderAccount.Balance - TransactionAmount;
            db.query('UPDATE currentaccounts SET Balance = ? WHERE CurrentAccount = ?', [newSenderBalance, parseInt(SenderAccID)], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database update error' }).end();
                }

                const newReceiverBalance = +receiverAccount.Balance + +TransactionAmount;
                db.query(`UPDATE savingsaccounts set Balance = ? WHERE SavingsType = ?`, [newReceiverBalance, parseInt(ReceiverAccID)], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Database update error' }).end();
                    }

                    db.query('INSERT INTO SavingsHistory (CurrentAccountID, FlexSaveAccountID, TransactionAmount) VALUES (?, ?, ?)',
                        [SenderAccID,  ReceiverAccID, TransactionAmount],
                        async (err, result) => {
                            if (err) {
                                return res.status(500).json(err).end();
                            }
                            res.status(200).json({ message: 'Transaction completed and email sent successfully' }).end();

                            }
                        
                    );
                });
            });
        });
    });
};



const getAllHistory = (req, res) => {
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
            const accountID = data[0].CurrentAccount;
            var sql = "SELECT * FROM savingshistory WHERE CurrentAccountID = ?";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(404).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(404).end();
        }
    });
}

module.exports = { getCurrentAccount, getSavingsAccounts, insertSaveTransaction, getAllHistory };
