const db = require('../../../db');



const getAccountForEdit = (req, res) => {
    const accountId = req.params.id;
    const sql = "SELECT UserID, CurrentAccount, Balance FROM currentaccounts WHERE AccountID = ?";

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
    const sqlUpdate = "UPDATE currentaccounts SET Balance=? WHERE AccountID=?";

    db.query(sqlUpdate, [Balance, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account updated successfully" });
    });
};

const getAllAccounts = (req, res) => {
    const sql = "SELECT * FROM currentaccounts";

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

const getAccountBySession = (req, res) => {
    const userID = req.session.uId; 
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
};

const deleteAccount = (req, res) => {
    const accountId = req.params.id;
    const sqlDelete = "DELETE FROM currentaccounts WHERE AccountID = ?";

    db.query(sqlDelete, accountId, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account deleted successfully" });
    });
};


const getAccountByUserID = (req, res) => {
    const { UserID } = req.body;
    const sql = "SELECT * FROM currentaccounts WHERE UserID = ?";

    db.query(sql, [UserID], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
};


module.exports = { getAccountForEdit, updateAccount, getAllAccounts, getAccountBySession, deleteAccount, getAccountByUserID };

