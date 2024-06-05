const db = require('../../db');


const getCurrencies = (req, res) => {
    const sql = "SELECT * FROM currencies";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(204).json("fail").end();
        }
    });
};

const getCurrenciesForEdit = (req, res) => {
    const currenciesID = req.params.id; 
    const sql = "SELECT  UserID, CurrencyCode, ExchangeRate FROM currencies WHERE CurrencyID  = ?";

    db.query(sql, [currenciesID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end(); 
        } else {
            return res.status(204).json({ message: "Goal not found" }).end();
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
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Goal updated successfully");
        return res.status(200).json("success").end();
    });
};


const deleteCurrencies = (req, res) => {
    const currenciesID = req.params.id;
    const sqlDelete = "DELETE FROM currencies WHERE CurrencyID = ?";

    db.query(sqlDelete, currenciesID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Account deleted successfully" }).end();
    });
};

module.exports = {getCurrencies, getCurrenciesForEdit, updateCurrencies, deleteCurrencies}