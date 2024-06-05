const db = require('../../../db');
const jwt = require('jsonwebtoken')



const getAccountForEdit = (req, res) => {
    const accountId = req.params.id;

    const sql = `

    SELECT u.*, a.CurrentAccount, a.CurrencyCode, a.Balance, a.AccountStatus
    FROM users u 
    INNER JOIN currentaccounts a ON a.UserID = u.userId
    WHERE a.CurrentAccount = ?

   
`;

    db.query(sql, [accountId], (err, data) => {
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

const updateAccount = (req, res) => {
    const accountId = req.params.id;
    const { Balance, AccountStatus } = req.body;
    const sqlUpdate = "UPDATE currentaccounts SET Balance=?,AccountStatus=?  WHERE CurrentAccount=?";

    db.query(sqlUpdate, [Balance,AccountStatus, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Account updated successfully" }).end();
    });
};

const getAllAccounts = (req, res) => {
    const sql = `
    SELECT u.*, a.CurrentAccount, a.CurrencyCode, a.Balance, a.AccountStatus
    FROM users u 
    INNER JOIN currentaccounts a ON a.userId = u.userId 
    
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

const getAccountBySession = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId; 
        // const sql = "SELECT * FROM currentaccounts WHERE UserID = ?";
        const sql = 
        `
            SELECT u.*, a.CurrentAccount, a.CurrencyCode, a.Balance
            FROM users u 
            INNER JOIN currentaccounts a ON a.userId = u.userId 
            WHERE u.userId = ?
        `;

        db.query(sql, [userID], (err, data) => {
            if (err) {
                return res.status(500).json("Error").end();
            }
            if (data.length > 0) {
                return res.status(200).json(data).end();
            } else {
                return res.status(204).json("fail").end();
            }
        });
    } catch (error) {
        console.error('getAllnterTransactions verification failed:', error);
    }
    
};

const deleteAccount = (req, res) => {
    const accountId = req.params.id;
    const sqlDelete = "DELETE FROM currentaccounts WHERE CurrentAccount = ?";

    db.query(sqlDelete, accountId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Account deleted successfully" }).end();
    });
};

const getAccountByUserID = (req, res) => {
    const { username } = req.body;
    const sql = `
    SELECT u.*, a.CurrentAccount, a.CurrencyCode, a.Balance, a.AccountStatus
    FROM users u 
    INNER JOIN currentaccounts a ON a.userId = u.userId 
    WHERE u.username = ?
`;
    db.query(sql, [username], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json(data);
    });
};


module.exports = { getAccountForEdit, updateAccount, getAllAccounts, getAccountBySession, deleteAccount, getAccountByUserID };


