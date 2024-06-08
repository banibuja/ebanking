
const db = require('../../db');

const insertTeam = (req, res) => {
    const { Emri, Teksti, Photo } = req.body;

    const sql = "INSERT INTO Team (Emri, Teksti, Photo) VALUES (?, ?, ?)";
    db.query(sql, [Emri, Teksti, Photo], (err, result) => {
        if (err) {
            console.error("Error adding Teams:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Teams added successfully");
        return res.status(200).json("success").end();
    });
};

const getTeam = (req, res) => {
    const sql = "SELECT * FROM Team";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(204).json("fail").end();
        }
    });
};



const getTeamForEdit = (req, res) => {
    const CaruselId = req.params.id;
    const sql = `
        SELECT * FROM Carusel WHERE TeamId = ?
    `;

    db.query(sql, [TeamId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Team not found" }).end();
        }
    });
};
const updateTeam = (req, res) => {
    const { Emri, Teksti, Photo} = req.body;
    const CarId = req.params.id; 

    const sql = "UPDATE Carusel SET Titulli = ?, Teksti = ?, Photo = ? WHERE CaruselId = ?";
    db.query(sql, [Emri, Teksti, Photo, CarId], (err, result) => {
        if (err) {
            console.error("Error updating Carus:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Crusel updated successfully");
        return res.status(200).json("success").end();
    });
};
const deleteTeam = (req, res) => {
    const CaruselId = req.params.id;
    const sql = "DELETE FROM Carusel WHERE CaruselId = ?";
    db.query(sql, [CaruselId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (result.affectedRows > 0) {
            return res.status(200).json('success').end();
        } else {
            return res.status(404).json({ message: "Carousel item not found" }).end();
        }
    });
};



module.exports = { insertTeam,getTeam,getTeamForEdit,updateTeam,deleteTeam };
