const db = require('../../db');


const getCurrencies = (req, res) => {
    const sql = "SELECT * FROM currencies";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
};

const getCurrenciesForEdit = (req, res) => {
    const currenciesID = req.params.id; 
    const sql = "SELECT  UserID, CurrencyCode, ExchangeRate FROM currencies WHERE CurrencyID  = ?";

    db.query(sql, [currenciesID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json({ message: "Goal not found" });
        }
    });
};

const updateCurrencies = (req, res) => {
    const { CurrencyCode, ExchangeRate } = req.body;
    const currenciesID = req.params.id; 

    const sql = "UPDATE currencies SET CurrencyCode = ?, ExchangeRate = ? WHERE CurrencyID = ?";
    db.query(sql, [CurrencyCode, ExchangeRate, currenciesID], (err, result) => {
        if (err) {
            console.error("Error updating goal:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Goal updated successfully");
        return res.json("success");
    });
};


const deleteCurrencies = (req, res) => {
    const currenciesID = req.params.id;
    const sqlDelete = "DELETE FROM currencies WHERE CurrencyID = ?";

    db.query(sqlDelete, currenciesID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Account deleted successfully" });
    });
};

module.exports = {getCurrencies, getCurrenciesForEdit, updateCurrencies, deleteCurrencies}