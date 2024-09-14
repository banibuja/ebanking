const db = require('../db'); // Adjust the path to your db connection file as needed

const Loan = {
    findByPk: (loanID, callback) => {
        const sql = "SELECT * FROM applyloans WHERE LoanID = ?";
        db.query(sql, [loanID], callback);
    },

    getAllByAccount: (accountID, callback) => {
        const sql = "SELECT * FROM applyloans WHERE AccountID = ?";
        db.query(sql, [accountID], callback);
    },

    insert: (loanData, callback) => {
        const sql = "INSERT INTO applyloans (AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')";
        db.query(sql, loanData, callback);
    },

    add: (loanData, callback) => {
        const sql = "INSERT INTO loans (AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Accepted')";
        db.query(sql, loanData, callback);
    },

    update: (loanID, loanData, callback) => {
        const sql = "UPDATE applyloans SET firstName=?, lastName=?, dateOfBirth=?, loanType=?, city=?, address=?, email=?, employmentStatus=?, annualIncome=?, loanAmount=?, loanPurpose=?, Status=? WHERE LoanID=?";
        db.query(sql, [...loanData, loanID], callback);
    },

    delete: (loanID, callback) => {
        const sql = "DELETE FROM applyloans WHERE LoanID = ?";
        db.query(sql, [loanID], callback);
    },

    getAccountNumberByUserId: (userID, callback) => {
        const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
        db.query(sql, [userID], callback);
    }
};

module.exports = Loan;
