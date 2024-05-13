const db = require('../../../db');

const getAccountById = (req, res) => {
    const accountId = req.params.id;
    const sql = "SELECT UserID, CurrentAccount, Balance FROM Accounts WHERE AccountID = ?";

    db.query(sql, [accountId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json({ message: "Account not found" });
        }
    });
};

const updateAccount = (req, res) => {
    const accountId = req.params.id;
    const { Balance } = req.body;
    const sqlUpdate = "UPDATE Accounts SET Balance=? WHERE AccountID=?";

    db.query(sqlUpdate, [Balance, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account updated successfully" });
    });
};

const getAccounts = (req, res) => {
    const sql = "SELECT * FROM Accounts";

    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
};

const getAccountByUserId = (req, res) => {
    const userID = req.session.uId; 
    const sql = "SELECT * FROM Accounts WHERE UserID = ?";

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
};

const deleteAccount = (req, res) => {
    const accountId = req.params.id;
    const sqlDelete = "DELETE FROM Accounts WHERE AccountID = ?";

    db.query(sqlDelete, accountId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account deleted successfully" });
    });
};

module.exports = { getAccountById, updateAccount, getAccounts, getAccountByUserId, deleteAccount };

