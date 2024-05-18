const db = require('../../../db');


const updateSavingsAccounts = (req, res) => {
    const Savingsid = req.params.id;
    const { Balance } = req.body;
    const sqlUpdate = "UPDATE savingsaccounts SET Balance=? WHERE SavingsID=?";

    db.query(sqlUpdate, [Balance, Savingsid], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "Account updated successfully" });
    });
};

const getSavingsAccountById = (req, res) => {
    const Savingsid = req.params.id;
    const sql = "SELECT UserID, SavingsType, Balance FROM savingsaccounts WHERE SavingsID = ?";

    db.query(sql, [Savingsid], (err, data) => {
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


const getAllSavingAccount = (req, res) => {
    const sql = "SELECT * FROM savingsaccounts";

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

const deleteSavings = (req, res) => {

    const AccountID = req.params.id;
    const sqlDelete = "DELETE FROM savingsaccounts WHERE SavingsID = ?";
  
    db.query(sqlDelete, AccountID, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "Message deleted successfully" });
    });
};

const getSavingsBySesison = (req, res) => {
    const userID = req.session.uId; 

    const sql = "SELECT * FROM savingsaccounts WHERE UserID = ?"; 

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

const getAccountByUserID = (req, res) => {
    const { UserID } = req.body;
    const sql = "SELECT * FROM savingsaccounts WHERE UserID = ?";

    db.query(sql, [UserID], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.json(data);
    });
};
module.exports = { updateSavingsAccounts, getSavingsAccountById, getAllSavingAccount, deleteSavings, getSavingsBySesison,getAccountByUserID };
