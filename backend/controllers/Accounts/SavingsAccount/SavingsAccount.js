const db = require('../../../db');

const jwt = require('jsonwebtoken')

const updateSavingsAccounts = (req, res) => {
    const Savingsid = req.params.id;
    const { Balance, AccountStatus } = req.body;
    const sqlUpdate = "UPDATE savingsaccounts SET Balance=?, AccountStatus=? WHERE SavingAccount =?";

    db.query(sqlUpdate, [Balance,AccountStatus, Savingsid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }

        return res.status(200).json({ message: "Account updated successfully" }).end();
    });
};

const getSavingsAccountById = (req, res) => {
    const Savingsid = req.params.id;
    const sql = `
    SELECT u.*, a.SavingAccount, a.CurrencyCode, a.Balance, a.AccountStatus
    FROM users u 
    INNER JOIN savingsaccounts a ON a.userId = u.userId 
    WHERE a.SavingAccount = ?

    
`;
    db.query(sql, [Savingsid], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end(); 
        } else {
            return res.status(204).json({ message: "Account not found" }).end();
        }
    });
};


const getAllSavingAccount = (req, res) => {
    const sql = `
    SELECT u.*, a.SavingAccount, a.CurrencyCode, a.Balance, a.AccountStatus
    FROM users u 
    INNER JOIN savingsaccounts a ON a.userId = u.userId 
    
`;
    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json("Error").end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(204).json("fail").end();
        }
    });
};

const deleteSavings = (req, res) => {

    const AccountID = req.params.id;
    const sqlDelete = "DELETE FROM savingsaccounts WHERE SavingAccount = ?";
  
    db.query(sqlDelete, AccountID, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }

        return res.status(200).json({ message: "Message deleted successfully" }).end();
    });
};

const getSavingsBySesison = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId; 

        const sql = `
            SELECT u.*, a.SavingAccount, a.CurrencyCode, a.Balance, a.AccountStatus
            FROM users u 
            INNER JOIN savingsaccounts a ON a.UserID = u.userId 
            WHERE u.userId = ?
        `;

        db.query(sql, [userID], (err, data) => {
            if (err) {
                return res.status(500).json({ error: "Internal server error" }).end();
            }
            if (data.length > 0) {
                return res.status(200).json(data).end();
            } else {
                return res.status(204).json({ message: "No savings accounts found for the user" }).end();
            }
        });
    } catch (error) {
        console.error('getSavingsBySesison verification failed:', error);
        return res.status(500).json({ error: "Internal server error" }).end();
    }
};


const getAccountByUserID = (req, res) => {
    const { username } = req.body;
    const sql = `
    SELECT u.*, a.SavingAccount, a.CurrencyCode, a.Balance, a.AccountStatus
    FROM users u 
    INNER JOIN savingsaccounts a ON a.UserID = u.userId 
    WHERE u.username = ?
`;
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json(data).end();
    });
};
module.exports = { updateSavingsAccounts, getSavingsAccountById, getAllSavingAccount, deleteSavings, getSavingsBySesison,getAccountByUserID };
