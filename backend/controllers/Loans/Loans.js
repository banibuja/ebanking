const db = require('../../db');

const getAllLoans = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }
    const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        if (data.length > 0) {
            const accountID = data[0].CurrentAccount;
            const sql = "SELECT * FROM applyloans WHERE AccountID = ?";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(404).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(404).end();
        }
    });
}

const getLoanForEdit = (req, res) => {
    const loanID = req.params.id;
    const sql = "SELECT * FROM applyloans WHERE LoanID = ?";

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

const applyLoan = (req, res) => {
    const { AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

    const checkAccountSql = "SELECT * FROM currentaccounts WHERE CurrentAccount = ?";
    db.query(checkAccountSql, [AccountNumber], (err, result) => {
        if (err) {
            console.error("Error checking account:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: "Account does not exist" });
        }

        const insertLoanSql = "INSERT INTO applyloans (AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')";
        
        db.query(insertLoanSql, [AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose], (err, result) => {
            if (err) {
                console.error("Error adding loan:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            console.log("Loan added successfully");
            return res.json({ message: "Loan added successfully" });
        });
    });
};

const addLoan = (req, res) => {
    const { AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

    const checkAccountSql = "SELECT * FROM currentaccounts WHERE CurrentAccount = ?";
    db.query(checkAccountSql, [AccountID], (err, result) => {
        if (err) {
            console.error("Error checking account:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(400).json({ error: "Account does not exist" });
        }

        const insertLoanSql = "INSERT INTO loans (AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Accepted')";

        db.query(insertLoanSql, [AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose], (err, result) => {
            if (err) {
                console.error("Error adding loan:", err);
                return res.status(500).json({ error: "Internal server error" });
            }
            console.log("Loan added successfully");
            return res.json({ message: "Loan added successfully" });
        });
    });
};

const updateLoan = (req, res) => {
    const { firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status } = req.body;
    const LoanID = req.params.id;

    const sql = "UPDATE applyloans SET firstName=?, lastName=?, dateOfBirth=?, loanType=?, city=?, address=?, email=?, employmentStatus=?, annualIncome=?, loanAmount=?, loanPurpose=?, Status=? WHERE LoanID=?";
    db.query(sql, [firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status, LoanID], (err, result) => {
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
    const sqlDelete = "DELETE FROM applyloans WHERE LoanID = ?";

    db.query(sqlDelete, [loanID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Loan deleted successfully" });
    });
};

const getAccountNumber = (req, res) => {
    const userId = req.session.uId;
    const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?"; 

    db.query(sql, [userId], (err, result) => {
        if (err) {
            console.error("Error fetching account number:", err);
            return res.status(500).json({ error: "Internal server error" });
        }

        if (result.length === 0) {
            return res.status(404).json({ error: "Account not found" });
        }

        res.json({ accountNumber: result[0].CurrentAccount });
    });
};

const updateStatusLoans = (req, res) => {
    const accountId = req.params.id;
    const { Status } = req.body;
    const sqlUpdate = "UPDATE applyloans SET Status=? WHERE AccountID=?";

    db.query(sqlUpdate, [Status, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" });
        }
        return res.status(200).json({ message: "Status updated successfully" });
    });
};

const getAllLoansForClient = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }
    const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).end();
        }
        if (data.length > 0) {
            const accountID = data[0].CurrentAccount;
            const sql = "SELECT * FROM applyloans WHERE AccountID=? ";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(404).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(404).end();
        }
    });
}

module.exports = {
    getAllLoansForClient,
    getAccountNumber,
    getAllLoans,
    getLoanForEdit,
    applyLoan,
    updateLoan,
    deleteLoan,
    addLoan,
    updateStatusLoans
};
