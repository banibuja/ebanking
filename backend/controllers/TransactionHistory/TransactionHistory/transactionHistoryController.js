const db = require('../../db');

const getAllTransactions = (req, res) => {
    db.query('SELECT * FROM transactionHistory', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

const getTransactionById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM transactionHistory WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results[0]);
    });
};

const createTransaction = (req, res) => {
    const { amount, date, description } = req.body;
    db.query('INSERT INTO transactionHistory (amount, date, description) VALUES (?, ?, ?)', [amount, date, description], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ message: 'Transaction created', id: results.insertId });
    });
};

const updateTransaction = (req, res) => {
    const { id } = req.params;
    const { amount, date, description } = req.body;
    db.query('UPDATE transactionHistory SET amount = ?, date = ?, description = ? WHERE id = ?', [amount, date, description, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Transaction updated' });
    });
};

const deleteTransaction = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM transactionHistory WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json({ message: 'Transaction deleted' });
    });
};

module.exports = {
    getAllTransactions,
    getTransactionById,
    createTransaction,
    updateTransaction,
    deleteTransaction
};
