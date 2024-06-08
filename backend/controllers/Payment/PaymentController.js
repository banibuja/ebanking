const db = require('../../db');
const jwt = require('jsonwebtoken');


const PaymentController = {
    getAllBills: (req, res) => {
        const sql = 'SELECT * FROM Bills';
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },

    AddBillForm: (req, res) => {
        const { UserID, ServiceType, Amount, DueDate } = req.body;
        const sql = 'INSERT INTO Bills (UserID, ServiceType, Amount, DueDate) VALUES (?, ?, ?, ?)';
        db.query(sql, [UserID, ServiceType, Amount, DueDate], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Bill added', BillID: result.insertId });
        });
    },

    

    deleteBills: (req, res) => {
        const { id } = req.params;
        const sql = 'DELETE FROM Bills WHERE BillID = ?';
        db.query(sql, [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Bill deleted' });
        });
    },

    updateBills: (req, res) => {
        const { id } = req.params;
        const { UserID, ServiceType, Amount, DueDate, Status } = req.body;
        const sql = 'UPDATE Bills SET UserID = ?, ServiceType = ?, Amount = ?, DueDate = ?, Status = ? WHERE BillID = ?';
        db.query(sql, [UserID, ServiceType, Amount, DueDate, Status, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Bill updated' });
        });
    }
};

module.exports = PaymentController;

