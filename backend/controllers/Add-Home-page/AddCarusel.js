const db = require('../../db');

const insertCarusel = (req, res) => {
    const { Titulli, Teksti, Photo } = req.body;

    const sql = "INSERT INTO Carusel (Titulli, Teksti, Photo) VALUES (?, ?, ?)";
    db.query(sql, [Titulli, Teksti, Photo], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Goal added successfully");
        return res.json("success");
    });
};

const getCarusel = (req, res) => {
    const sql = "SELECT * FROM Carusel";

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
module.exports = { insertCarusel,getCarusel };
