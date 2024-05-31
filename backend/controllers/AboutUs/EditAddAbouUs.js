const db = require('../../db');

const insertAboutUs = (req, res) => {
    const { Tittle, Info } = req.body;

    const sql = "INSERT INTO AboutUs (Tittle, Info) VALUES (?, ?)";
    db.query(sql, [Tittle, Info], (err, result) => {
        if (err) {
            console.error("Error adding AboutUs:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("AboutUs added successfully");
        return res.json("success");
    });
};


const getAboutUs = (req, res) => {
    const sql = "SELECT * FROM AboutUs";

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
module.exports = { insertAboutUs,getAboutUs };
