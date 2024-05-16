const db = require('../../db');

const getCurrentAccount = (req, res) => {
    const userID = req.session.uId;
    if (!userID) {
        return res.json("fail");
    }

    const sql = "SELECT * FROM currentaccounts WHERE UserID = ?";
    db.query(sql, [userID], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
}
module.exports = {getCurrentAccount};