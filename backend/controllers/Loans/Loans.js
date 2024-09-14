// kodi ma heret qe ka qene 
const db = require('../../db');
const jwt = require('jsonwebtoken')
const getAllLoans = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
    if (!userID) {
        return res.status(500).json("Not logged in");
    }
    const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json("server error").end();
        }
        if (data.length > 0) {
            const accountID = data[0].CurrentAccount;
            const sql = "SELECT * FROM applyloans WHERE AccountID = ?";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).json("server error").end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(204).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(204).json("No Transactions found").end();
        }
    });} catch (error) {
        res.status(401).send("not logged in").end();
      }
}

const getLoanForEdit = (req, res) => {
    const loanID = req.params.id;
    const sql = "SELECT * FROM applyloans WHERE LoanID = ?";

    db.query(sql, [loanID], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Loan not found" }).end();
        }
    });
};

const applyLoan = (req, res) => {
    const { AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

    const checkAccountSql = "SELECT * FROM currentaccounts WHERE CurrentAccount = ?";
    db.query(checkAccountSql, [AccountNumber], (err, result) => {
        if (err) {
            console.error("Error checking account:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }

        if (result.length === 0) {
            return res.status(204).json({ error: "Account does not exist" }).end();
        }

        const insertLoanSql = "INSERT INTO applyloans (AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending')";
        
        db.query(insertLoanSql, [AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose], (err, result) => {
            if (err) {
                console.error("Error adding loan:", err);
                return res.status(500).json({ error: "Internal server error" }).end();
            }
            console.log("Loan added successfully");
            return res.status(200).json({ message: "Loan added successfully" }).end();
        });
    });
};

const addLoan = (req, res) => {
    const { AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

    const checkAccountSql = "SELECT * FROM currentaccounts WHERE CurrentAccount = ?";
    db.query(checkAccountSql, [AccountID], (err, result) => {
        if (err) {
            console.error("Error checking account:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }

        if (result.length === 0) {
            return res.status(204).json({ error: "Account does not exist" }).end();
        }

        const insertLoanSql = "INSERT INTO loans (AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Accepted')";

        db.query(insertLoanSql, [AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose], (err, result) => {
            if (err) {
                console.error("Error adding loan:", err);
                return res.status(500).json({ error: "Internal server error" }).end();
            }
            console.log("Loan added successfully");
            return res.status(200).json({ message: "Loan added successfully" }).end();
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
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Loan updated successfully");
        return res.status(200).json({ message: "Loan updated successfully" }).end();
    });
};

const deleteLoan = (req, res) => {
    const loanID = req.params.id;
    const sqlDelete = "DELETE FROM applyloans WHERE LoanID = ?";

    db.query(sqlDelete, [loanID], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Loan deleted successfully" }).end();
    });
};

const getAccountNumber = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
    const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?"; 

    db.query(sql, [userID], (err, result) => {
        if (err) {
            console.error("Error fetching account number:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }

        if (result.length === 0) {
            return res.status(204).json({ error: "Account not found" }).end();
        }

        res.status(200).json({ accountNumber: result[0].CurrentAccount }).end();
    });
} catch (error) {
    console.error('Token verification failed:', error.message);
}
};

const updateStatusLoans = (req, res) => {
    const accountId = req.params.id;
    const { Status } = req.body;
    const sqlUpdate = "UPDATE applyloans SET Status=? WHERE AccountID=?";

    db.query(sqlUpdate, [Status, accountId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        return res.status(200).json({ message: "Status updated successfully" }).end();
    });
};

const getAllLoansForClient = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
    if (!userID) {
        return res.status(500).json("Not logged in").end();
    }
    const sql = "SELECT CurrentAccount FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json("Server error").end();
        }
        if (data.length > 0) {
            const accountID = data[0].CurrentAccount;
            const sql = "SELECT * FROM applyloans WHERE AccountID=? ";
            db.query(sql, [accountID], (err, data) => {
                if (err) {
                    return res.status(500).json("Query error").end();
                }
                if (data.length > 0) {
                    return res.status(200).json(data).end();
                } else {
                    return res.status(204).json("No Transactions found").end();
                }
            });
        } else {
            return res.status(204).json("No Transactions found").end();
        }
    });
} catch (error) {
        res.status(401).send("not logged in").end();
      }
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


// const Loan = require('../../Models/Loans/Loans');
// const jwt = require('jsonwebtoken');

// // Fetch all loans for a specific account
// const getAllLoansForClient = async (req, res) => {
//     try {
//         const token = req.cookies.authToken;
//         if (!token) return res.status(401).json("Not logged in");

//         const secretKey = process.env.SECRET;
//         const decodedToken = jwt.verify(token, secretKey);
//         const userID = decodedToken.userId;

//         if (!userID) return res.status(401).json("Not logged in");

//         const accountData = await Loan.getAccountNumberByUserId(userID);
//         if (accountData.length > 0) {
//             const accountID = accountData[0].CurrentAccount;
//             const loans = await Loan.getAllByAccount(accountID);
//             if (loans.length > 0) {
//                 return res.status(200).json(loans);
//             } else {
//                 return res.status(404).json("No loans found");
//             }
//         } else {
//             return res.status(404).json("No loans found");
//         }
//     } catch (error) {
//         console.error('Error fetching loans:', error);
//         res.status(401).send("Not logged in");
//     }
// };

// // Fetch a specific loan by ID
// const getLoanForEdit = async (req, res) => {
//     try {
//         const loanID = req.params.id;
//         const loan = await Loan.findByPk(loanID);
//         if (loan) {
//             return res.status(200).json(loan);
//         } else {
//             return res.status(404).json("Loan not found");
//         }
//     } catch (error) {
//         console.error('Error fetching loan:', error);
//         res.status(500).json("Internal server error");
//     }
// };

// // Apply for a loan
// const applyLoan = async (req, res) => {
//     try {
//         const { AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

//         const accountExists = await Loan.getAccountNumberByUserId(AccountNumber);
//         if (accountExists.length === 0) return res.status(404).json("Account does not exist");

//         await Loan.insert([AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose]);
//         return res.status(201).json("Loan application submitted successfully");
//     } catch (error) {
//         console.error('Error applying for loan:', error);
//         res.status(500).json("Internal server error");
//     }
// };

// // Add a loan (admin function)
// const addLoan = async (req, res) => {
//     try {
//         const { AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

//         const accountExists = await Loan.getAccountNumberByUserId(AccountID);
//         if (accountExists.length === 0) return res.status(404).json("Account does not exist");

//         await Loan.add([AccountID, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose]);
//         return res.status(201).json("Loan added successfully");
//     } catch (error) {
//         console.error('Error adding loan:', error);
//         res.status(500).json("Internal server error");
//     }
// };

// // Update loan details
// const updateLoan = async (req, res) => {
//     try {
//         const { firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status } = req.body;
//         const loanID = req.params.id;

//         await Loan.update(loanID, [firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status]);
//         return res.status(200).json("Loan updated successfully");
//     } catch (error) {
//         console.error('Error updating loan:', error);
//         res.status(500).json("Internal server error");
//     }
// };

// // Delete a loan
// const deleteLoan = async (req, res) => {
//     try {
//         const loanID = req.params.id;
//         await Loan.delete(loanID);
//         return res.status(200).json("Loan deleted successfully");
//     } catch (error) {
//         console.error('Error deleting loan:', error);
//         res.status(500).json("Internal server error");
//     }
// };

// // Update loan status (admin function)
// const updateStatusLoans = async (req, res) => {
//     try {
//         const accountId = req.params.id;
//         const { Status } = req.body;
//         await Loan.updateStatus(accountId, Status);
//         return res.status(200).json("Status updated successfully");
//     } catch (error) {
//         console.error('Error updating loan status:', error);
//         res.status(500).json("Internal server error");
//     }
// };

// module.exports = {
//     getAllLoansForClient,
//     getLoanForEdit,
//     applyLoan,
//     addLoan,
//     updateLoan,
//     deleteLoan,
//     updateStatusLoans
// };
