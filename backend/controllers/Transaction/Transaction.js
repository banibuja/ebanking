const db = require('../../db');
const sendTransactionEmail = require('../Transaction/sendEmailTransaction');
const jwt = require('jsonwebtoken');

const getAllTransactions = (req, res) => {
    try {
        const token = req.cookies.authToken;
        const secretKey = process.env.SECRET;
        const decodedToken = jwt.verify(token, secretKey);
     
      
    const userID = decodedToken.userId;
    if (!userID) {
        return res.status(401).json("fail").end();
    }
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    var sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        if (data.length > 0) {
            const accountID = data[0].CurrentAccount;

            var sql = "SELECT * FROM transactions WHERE SenderAccID = ? AND (CreatedAt BETWEEN ? AND ? )";
            db.query(sql, [accountID, startDate, endDate], (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(204).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(404).end();
        }
    });} catch (error) {
        res.status(401).send("not logged in").end();
      }
}

const getAllnterTransactions = (req, res) => {
    try {
        const token = req.cookies.authToken; // Retrieve the JWT token from the cookie
        const secretKey = process.env.SECRET; // Retrieve the secret key from environment variables
        const decodedToken = jwt.verify(token, secretKey);
     
      
    const userID = decodedToken.userId;
    if (!userID) {
        return res.status(401).json("fail").end();
    }
    var sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        if (data.length > 0) {
            const accountID = data[0].CurrentAccount;
            var sql = "SELECT * FROM transactions WHERE SenderAccID = ?";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(204).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(204).end();
        }
    });} catch (error) {
        res.status(401).send("not logged in").end();
      }
}

const getCurrentAccount = (req, res) => {
    try {
        const token = req.cookies.authToken; // Retrieve the JWT token from the cookie
        const secretKey = process.env.SECRET; // Retrieve the secret key from environment variables
        const decodedToken = jwt.verify(token, secretKey);
     
      
    const userID = decodedToken.userId;
    if (!userID) {
        return res.status(401).json("fail").end();
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
    });} catch (error) {
        res.status(401).send("not logged in").end();
      }
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
            return res.status(400).json("Receiver account not found").end();
        }
        if (!senderAccount || senderAccount.Balance < TransactionAmount) {
            return res.status(400).json("Not enough balance").end();
        }
        if (!SenderAccID || !ReceiverAccID || !TransactionType || !TransactionAmount || !Currency || !AdditionalInfo) {
            return res.status(400).json("Missing parameters").end();
        }

        const newSenderBalance = senderAccount.Balance - TransactionAmount;
        db.query('UPDATE currentaccounts SET Balance = ? WHERE CurrentAccount = ?', [newSenderBalance, parseInt(SenderAccID)], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database update error' }).end();
            }

            const newReceiverBalance = +receiverAccount.Balance + +TransactionAmount;
            db.query('UPDATE currentaccounts SET Balance = ? WHERE CurrentAccount = ?', [newReceiverBalance, parseInt(ReceiverAccID)], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database update error' }).end();
                }

                db.query(`INSERT INTO transactions (SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
                [SenderAccID, ReceiverAccID, TransactionType, TransactionAmount, Currency, Statusi, AdditionalInfo, TransactionFee], 
                async (err, result) => {
                    if (err) {
                        return res.status(500).end();
                    }
                    // try {
                    // const senderEmail = 'ebankingebanking7@gmail.com'; 
                    // const transactionDetails = {
                    //     senderEmail,
                    //     receiverAccID: ReceiverAccID,
                    //     transactionType: TransactionType,
                    //     transactionAmount: TransactionAmount,
                    //     currency: Currency,
                    //     additionalInfo: AdditionalInfo
                    // };
                    // await sendTransactionEmail(transactionDetails);
                    res.status(200).json({ message: 'Transaction completed and email sent successfully' }).end();
                    // } catch (emailError) {
                    //     console.error('Error sending email:', emailError);
                    //     res.status(500).json({ error: 'Transaction completed but failed to send email' }).end();
                    // }
                });
            });
        });
    });
};

module.exports = { getCurrentAccount, insertTransaction, getAllTransactions, getAllnterTransactions };
