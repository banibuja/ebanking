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



const getCaruselForEdit = (req, res) => {
    const CaruselId = req.params.id;
    const sql = `
        SELECT * FROM Carusel WHERE CaruselId = ?
    `;

    db.query(sql, [CaruselId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Carusel not found" });
        }
    });
};
const updateCarusel = (req, res) => {
    const { Titulli, Teksti, Photo} = req.body;
    const CarId = req.params.id; 

    const sql = "UPDATE Carusel SET Titulli = ?, Teksti = ?, Photo = ? WHERE CaruselId = ?";
    db.query(sql, [Titulli, Teksti, Photo, CarId], (err, result) => {
        if (err) {
            console.error("Error updating Carus:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
        console.log("Crusel updated successfully");
        return res.json("success");
    });
};
const deleteCarusel = (req, res) => {
    const CaruselId = req.params.id;
console.log(req.params.CaruselId);
    const sql = "DELETE from Carusel WHERE CaruselId = ?";
    db.query(sql, [CaruselId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ message: "Carusel not found" });
        }
    });

}


module.exports = { insertCarusel,getCarusel,getCaruselForEdit,updateCarusel,deleteCarusel };
