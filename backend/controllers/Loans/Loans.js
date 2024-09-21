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
// const { Loan, } = require('../../models'); // Importoni modelet tuaja
// const jwt = require('jsonwebtoken');

// exports.getAllLoans = async (req, res) => {
//     try {
//         const token = req.cookies.authToken; 
//         const secretKey = process.env.SECRET; 
//         const decodedToken = jwt.verify(token, secretKey);
//         const userID = decodedToken.userId;

//         if (!userID) {
//             return res.status(401).json({ message: "Not logged in" });
//         }

//         const account = await CurrentAccount.findOne({ where: { UserID: userID } });

//         if (account) {
//             const loans = await Loan.findAll({ where: { AccountID: account.CurrentAccount } });

//             if (loans.length > 0) {
//                 return res.status(200).json(loans);
//             } else {
//                 return res.status(204).json({ message: "No Transactions found" });
//             }
//         } else {
//             return res.status(204).json({ message: "No Transactions found" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: "Not logged in" });
//     }
// };

// exports.getLoanForEdit = async (req, res) => {
//     const loanID = parseInt(req.params.id);

//     try {
//         const loan = await Loan.findByPk(loanID);

//         if (loan) {
//             return res.status(200).json(loan);
//         } else {
//             return res.status(404).json({ message: "Loan not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.applyLoan = async (req, res) => {
//     const { AccountNumber, firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose } = req.body;

//     if (!AccountNumber || !firstName || !lastName || !dateOfBirth || !loanType || !city || !address || !email || !employmentStatus || !annualIncome || !loanAmount || !loanPurpose) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const account = await CurrentAccount.findOne({ where: { CurrentAccount: AccountNumber } });

//         if (!account) {
//             return res.status(404).json({ message: "Account does not exist" });
//         }

//         const newLoan = await Loan.create({
//             AccountID: account.CurrentAccount,
//             firstName,
//             lastName,
//             dateOfBirth,
//             loanType,
//             city,
//             address,
//             email,
//             employmentStatus,
//             annualIncome,
//             loanAmount,
//             loanPurpose,
//             Status: 'Pending'
//         });

//         return res.status(201).json({ message: "Loan added successfully", newLoan });
//     } catch (error) {
//         console.error("Error adding loan:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.updateLoan = async (req, res) => {
//     const LoanID = parseInt(req.params.id);
//     const { firstName, lastName, dateOfBirth, loanType, city, address, email, employmentStatus, annualIncome, loanAmount, loanPurpose, Status } = req.body;

//     if (!firstName || !lastName || !dateOfBirth || !loanType || !city || !address || !email || !employmentStatus || !annualIncome || !loanAmount || !loanPurpose || !Status) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const loan = await Loan.findByPk(LoanID);

//         if (!loan) {
//             return res.status(404).json({ message: "Loan not found" });
//         }

//         await loan.update({
//             firstName,
//             lastName,
//             dateOfBirth,
//             loanType,
//             city,
//             address,
//             email,
//             employmentStatus,
//             annualIncome,
//             loanAmount,
//             loanPurpose,
//             Status
//         });

//         return res.status(200).json({ message: "Loan updated successfully", loan });
//     } catch (error) {
//         console.error("Error updating loan:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.deleteLoan = async (req, res) => {
//     const loanID = parseInt(req.params.id);

//     try {
//         const loan = await Loan.findByPk(loanID);

//         if (!loan) {
//             return res.status(404).json({ message: "Loan not found" });
//         }

//         await loan.destroy();
//         return res.status(200).json({ message: "Loan deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.getAccountNumber = async (req, res) => {
//     try {
//         const token = req.cookies.authToken; 
//         const secretKey = process.env.SECRET; 
//         const decodedToken = jwt.verify(token, secretKey);
//         const userID = decodedToken.userId;

//         const account = await CurrentAccount.findOne({ where: { UserID: userID } });

//         if (!account) {
//             return res.status(404).json({ message: "Account not found" });
//         }

//         return res.status(200).json({ accountNumber: account.CurrentAccount });
//     } catch (error) {
//         console.error('Token verification failed:', error.message);
//         return res.status(401).json({ message: "Not logged in" });
//     }
// };

// exports.updateStatusLoans = async (req, res) => {
//     const accountId = parseInt(req.params.id);
//     const { Status } = req.body;

//     try {
//         const [updated] = await Loan.update({ Status }, { where: { AccountID: accountId } });

//         if (updated) {
//             return res.status(200).json({ message: "Status updated successfully" });
//         } else {
//             return res.status(404).json({ message: "Loan not found" });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// module.exports = {
//     getAllLoans,
//     getLoanForEdit,
//     applyLoan,
//     updateLoan,
//     deleteLoan,
//     getAccountNumber,
//     updateStatusLoans
// };