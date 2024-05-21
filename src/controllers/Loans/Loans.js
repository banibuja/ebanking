const db = require('../../db');

// Get all loans
const getLoans = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    var sql = "SELECT * FROM loans WHERE AccountID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (data.length > 0) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({ message: 'No loans found' });
        }
    });
};

// Insert a new loan
const insertLoan = (req, res) => {
    const { AccountID, LoanAmount, LoanConditions, Status, ClientName } = req.body;

    if (!AccountID || !LoanAmount || !LoanConditions || !Status || !ClientName) {
        return res.json("Missing parameters");
    }

    var sql = `INSERT INTO loans (AccountID, LoanAmount, LoanConditions, Status, ClientName) VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [AccountID, LoanAmount, LoanConditions, Status, ClientName], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert error' });
        }
        res.status(200).json({ message: 'Loan created successfully' });
    });
};

module.exports = { getLoans, insertLoan };
