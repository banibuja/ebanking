const db = require('../../db');
const bcrypt = require('bcrypt');

const getClientforProfile = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.status(401).json("User not logged in");
    }
    
    const sql = "SELECT * FROM users WHERE userId = ?";

    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.status(500).json("Error");
        }
        if (data.length > 0) {
            return res.json(data[0]); 
        } else {
            return res.status(404).json("fail");
        }
    });
};

const updateProfile = async (req, res) => {
    const { userId } = req.session;
    const { currentPassword, newPassword, confirmPassword, ...otherDetails } = req.body;

    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const sqlGetUser = "SELECT password FROM users WHERE userId = ?";
        const [userResults] = await db.query(sqlGetUser, [userId]);

        if (userResults.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = userResults[0];

        const isMatch = await bcrypt.compare(currentPassword, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const sqlUpdateUser = "UPDATE users SET ? WHERE userId = ?";
        await db.query(sqlUpdateUser, [{ ...otherDetails, password: hashedPassword }, userId]);

        return res.json({ message: 'Profile updated successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getClientforProfile,
    updateProfile
};
