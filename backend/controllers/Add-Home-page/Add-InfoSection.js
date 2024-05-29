const db = require('../../db');

const insertInfoSection = (req, res) => {
    const { Info } = req.body;

    const sql = "INSERT INTO InfoSection (Info) VALUES (?)";
    db.query(sql, [Info], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Goal added successfully");
        return res.json("success");
    });
};

const getInfoSection = (req, res) => {
    const sql = "SELECT * FROM InfoSection";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("fail");
        }
    });
};
module.exports = { insertInfoSection,getInfoSection };
