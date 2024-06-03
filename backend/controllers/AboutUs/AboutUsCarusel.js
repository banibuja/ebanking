const db = require('../../db');

const insertAboutUsCarusel = (req, res) => {
    const { Titulli, Teksti, Photo } = req.body;

    const sql = "INSERT INTO Carusel (Titulli, Teksti, Photo) VALUES (?, ?, ?)";
    db.query(sql, [Titulli, Teksti, Photo], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Goal added successfully");
        return res.status(200).json("success").end();
    });
};

const getAboutUsCarusel = (req, res) => {
    const sql = "SELECT * FROM Carusel";

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



const getAboutUsCaruselForEdit = (req, res) => {
    const CaruselId = req.params.id;
    const sql = `
        SELECT * FROM Carusel WHERE CaruselId = ?
    `;

    db.query(sql, [CaruselId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Carusel not found" }).end();
        }
    });
};
const updateAboutUsCarusel = (req, res) => {
    const { Titulli, Teksti, Photo} = req.body;
    const CarId = req.params.id; 

    const sql = "UPDATE Carusel SET Titulli = ?, Teksti = ?, Photo = ? WHERE CaruselId = ?";
    db.query(sql, [Titulli, Teksti, Photo, CarId], (err, result) => {
        if (err) {
            console.error("Error updating Carus:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Crusel updated successfully");
        return res.status(200).json("success").end();
    });
};
const deleteAboutUsCarusel = (req, res) => {
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



module.exports = { insertAboutUsCarusel,getAboutUsCarusel,getAboutUsCaruselForEdit,updateAboutUsCarusel,deleteAboutUsCarusel };
