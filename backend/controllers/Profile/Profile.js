const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getClientforProfile = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
    if (!userID) {
        return res.status(500).json("User not logged in").end();
    }
    
    const sql = `
    SELECT u.*, a.Country, a.City, a.Street
    FROM users u 
    INNER JOIN adresa a ON a.userId = u.userId
    WHERE u.userId = ?
    `;
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json("Error").end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end(); 
        } else {
            return res.status(204).json("fail").end();
        }
    });
} catch (error) {
        res.status(401).send("not logged in").end();
      }
};

const updateProfile = async (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
} catch (error) {
        res.status(401).send("not logged in").end();
      }
    const details = req.body;

    console.log(details);
    try {
        const sqlGetUser = "SELECT * FROM users WHERE userId = ?";
        db.query(sqlGetUser, [userId], async (err, data) => {


            if (data.length === 0) {
                return res.status(204).json({ message: 'User not found' }).end();
            }

            const sqlUpdateUser = "UPDATE users SET ? WHERE userId = ?";
            db.query(sqlUpdateUser, [{ ...details }, userId], (err, data) => {
                console.log("err" + err);
                console.log("data" + data);
                if (err) res.status(204).json(err).end();
                return res.status(200).json({ message: 'Profile updated successfully' }).end();
            });
        });
    } catch (error) {
        console.error("error");
        return res.status(500).json({ message: 'Server error' }).end();


    }
};
const updatePassword = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
} catch (error) {
        res.status(401).send("not logged in").end();
      }
    const { currentPassword, newPassword, confirmPassword } = req.body;
    console.log(req.body);

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' }).end();
    }

    const sqlGetUser = "SELECT password FROM users WHERE userId = ?";
        db.query(sqlGetUser, [userId], async (err, data) => {


        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' }).end();
        }

        const user = data[0];

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' }).end();
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

            const sqlUpdateUser = "UPDATE users SET password = ? WHERE userId = ?";
            db.query(sqlUpdateUser, [hashedPassword, userId], (err, data) => {
                if (err) res.status(404).json(err).end();
                return res.status(200).json({ message: 'Profile updated successfully' }).end();
        });
        })
};
const updateProfilePicture = (req, res) => {
    try {
        const token = req.cookies.authToken; 
        const secretKey = process.env.SECRET; 
        const decodedToken = jwt.verify(token, secretKey);

        const userID = decodedToken.userId;
} catch (error) {
        res.status(401).send("not logged in").end();
      }
    const base64 = req.body.base64;

    db.query(
        "UPDATE users SET profilePicture = ? WHERE userId = ?",
        [base64, userId],
        (err, data) => {
            if (err) res.status(404).json(err).end();
            return res.status(200).json({ message: 'Profile updated successfully' }).end();
        }
    )
}

module.exports = {
    getClientforProfile,
    updateProfile,
    updatePassword,
    updateProfilePicture
};
