// LoginController.js
const db = require('../../db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [req.body.username], async (err, result) => {
        if (err) {
            console.error("Error connecting to database:", err);
            return res.json({ Message: "bad connection", Login: false });
        }

        if (result.length > 0) {
            const storedHashedPassword = result[0].password;
            console.log("Stored hashed password:", storedHashedPassword);

            bcrypt.compare(req.body.password, storedHashedPassword, (compareErr, comparison) => {
                if (compareErr) {
                    console.error("Error comparing passwords:", compareErr);
                    return res.json({ Message: "Error during login", Login: false });
                }

                if (comparison) {
                    const lastLogin = new Date()
                    const userId = result[0].userId;
                    db.query("UPDATE users SET last_login = ? WHERE userId = ?", [lastLogin, userId], (updateErr, updateResult) => {
                        if (updateErr) {
                            console.error("Error updating last login timestamp:", updateErr);
                            return res.json({ Message: "Error during login", Login: false });
                        }
                    });

                    db.query(`SELECT AccessLevel FROM accesspermissions WHERE UserID = ${userId}`, (error, results) => {
                        if (error) {
                            console.error("Error querying access permissions:", error);
                            return res.json({ Message: "Error during login", Login: false });
                        }

                        const accessToken = jwt.sign({ userId, username: result[0].username, role: results[0].AccessLevel }, process.env.SECRET, { expiresIn: '15m' });

                        res.cookie('authToken', accessToken, { 
                            maxAge: 3600000, 
                            httpOnly: true, 
                            secure: true 
                        });
                        res.json({ accessToken, message: "Login successful", Login: true });
                    });
                } else {
                    console.log(comparison);
                    return res.json({ Message: "Incorrect password", Login: false });
                }
            });
        } else {
            return res.json({ Message: "Username not found", Login: false });
        }
    });
};

module.exports = {
    login
};
