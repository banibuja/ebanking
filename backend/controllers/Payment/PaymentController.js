const db = require('../../db');
const jwt = require('jsonwebtoken');

const PaymentController = {
    getAllBills: (req, res) => {
       
            try {
                const token = req.cookies.authToken; 
                const secretKey = process.env.SECRET; 
                const decodedToken = jwt.verify(token, secretKey);
        
                const userID = decodedToken.userId;
            if (!userID) {
                return res.status(500).json("Not logged in").end();
            }
            const sql = "SELECT * FROM users WHERE userId = ?";
            db.query(sql, [userID], (err, data) => {
                if (err) {
                    return res.status(500).json("Server error").end();
                }
                if (data.length > 0) {
                    const accountID = data[0].userId;
                    const sql = "SELECT * FROM bills WHERE userId=? ";
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
    ,

    getAllBillsForStaff: (req, res) => {
        const sql = 'SELECT * FROM Bills';
        db.query(sql, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json(results);
        });
    },
          

    AddBillForm: (req, res) => {
        const { username, ServiceType, Amount, DueDate } = req.body;

        const checkAccountSql = "SELECT * FROM users WHERE username = ?";
        db.query(checkAccountSql, [username], (err, result) => {
            if (err) {
                console.error("Error checking account:", err);
                return res.status(500).json({ error: "Internal server error" }).end();
            }

            if (result.length === 0) {
                return res.status(204).json({ error: "Account does not exist" }).end();
            }

            const UserID = result[0].userId; 

            const sql = 'INSERT INTO Bills (UserID, ServiceType, Amount, DueDate) VALUES (?, ?, ?, ?)';
            db.query(sql, [UserID, ServiceType, Amount, DueDate], (err, result) => {
                if (err) {
                    console.error("Error inserting bill:", err);
                    return res.status(500).send(err);
                }
                res.json({ message: 'Bill added' });
            });
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
        const { NrPersonal, ServiceType, Amount, DueDate, Status } = req.body;
        const sql = 'UPDATE Bills SET NrPersonal = ?, ServiceType = ?, Amount = ?, DueDate = ?, Status = ? WHERE BillID = ?';
        db.query(sql, [NrPersonal, ServiceType, Amount, DueDate, Status, id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ message: 'Bill updated' });
        });
    },

    getNrPersonal: (req, res) => {
        try {
            const token = req.cookies.authToken; 
            const secretKey = process.env.SECRET; 
            const decodedToken = jwt.verify(token, secretKey);

            const userID = decodedToken.userId;
            const sql = "SELECT username FROM users WHERE userId = ?"; 

            db.query(sql, [userID], (err, result) => {
                if (err) {
                    console.error("Error fetching NrPersonal:", err);
                    return res.status(500).json({ error: "Internal server error" }).end();
                }

                if (result.length === 0) {
                    return res.status(204).json({ error: "Account not found" }).end();
                }

                res.status(200).json({ username: result[0].username }).end();
            });
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ error: "Unauthorized" }).end();
        }
    }
};

module.exports = PaymentController;
