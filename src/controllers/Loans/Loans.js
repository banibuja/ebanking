const db = require('../../db');

const getAllLoans = (req, res) => {
    const sql = "SELECT * FROM loans";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json({ message: "No loans found" });
        }
    });
};

const getLoanForEdit = (req, res) => {
    const loanID = req.params.id;
    const sql = "SELECT AccountID, LoanAmount, LoanType, LoanConditions, Status FROM loans WHERE LoanID = ?";

    db.query(sql, [loanID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Loan not found" });
        }
    });
};

const addLoan = (req, res) => {
    const { AccountID, LoanAmount, LoanType, LoanConditions, Status } = req.body;
    const sql = "INSERT INTO loans (AccountID, LoanAmount, LoanType, LoanConditions, Status) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [AccountID, LoanAmount, LoanType, LoanConditions, Status], (err, result) => {
        if (err) {
            console.error("Error adding loan:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Loan added successfully");
        return res.json({ message: "Loan added successfully" });
    });
};

const updateLoan = (req, res) => {
    const { AccountID, LoanAmount, LoanType, LoanConditions, Status } = req.body;
    const loanID = req.params.id;

    const sql = "UPDATE loans SET AccountID = ?, LoanAmount = ?, LoanType = ?, LoanConditions = ?, Status = ? WHERE LoanID = ?";
    db.query(sql, [AccountID, LoanAmount, LoanType, LoanConditions, Status, loanID], (err, result) => {
        if (err) {
            console.error("Error updating loan:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Loan updated successfully");
        return res.json({ message: "Loan updated successfully" });
    });
};

const deleteLoan = (req, res) => {
    const loanID = req.params.id;
    const sqlDelete = "DELETE FROM loans WHERE LoanID = ?";

    db.query(sqlDelete, loanID, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Loan deleted successfully" });
    });
};

module.exports = { getAllLoans, getLoanForEdit, addLoan, updateLoan, deleteLoan };
