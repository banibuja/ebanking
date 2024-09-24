/*const db = require('../../db');

const insertCarusel = (req, res) => {
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

const getCarusel = (req, res) => {
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



const getCaruselForEdit = (req, res) => {
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
const updateCarusel = (req, res) => {
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
const deleteCarusel = (req, res) => {
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



module.exports = { insertCarusel,getCarusel,getCaruselForEdit,updateCarusel,deleteCarusel };
*/
const { Carusel } = require('../../Models/Carusel');
const jwt = require('jsonwebtoken');

// Helper to get the userID from JWT token
const getUserIdFromToken = (req, res) => {
    const token = req.cookies.authToken;
    const secretKey = process.env.SECRET;
    try {
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken.userId;
    } catch (error) {
        res.status(401).json({ error: "Not logged in" }).end();
        return null;
    }
};

// Insert a new carusel (create)
const insertCarusel = async (req, res) => {
    const { Titulli, Teksti, Photo } = req.body;
    
    if (!Titulli || !Teksti || !Photo) {
        return res.status(400).json({ error: "Missing required fields" }).end();
    }

    try {
        const newCarusel = await Carusel.create({ Titulli, Teksti, Photo });
        res.status(200).json({ message: "Carusel created", data: newCarusel }).end();
    } catch (error) {
        console.error("Error creating carusel:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Get all carusels (findAll)
const getCarusel = async (req, res) => {
    try {
        const carusels = await Carusel.findAll();
        if (carusels.length > 0) {
            res.status(200).json(carusels).end();
        } else {
            res.status(204).json({ message: "No carusels found" }).end();
        }
    } catch (error) {
        console.error("Error fetching carusels:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Get a single carusel by ID (findOne)
const getCaruselForEdit = async (req, res) => {
    const CaruselId = req.params.id;

    try {
        const carusel = await Carusel.findByPk(CaruselId);
        if (carusel) {
            res.status(200).json(carusel).end();
        } else {
            res.status(404).json({ message: "Carusel not found" }).end();
        }
    } catch (error) {
        console.error("Error fetching carusel:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Update a carusel by ID (update)
const updateCarusel = async (req, res) => {
    const { Titulli, Teksti, Photo } = req.body;
    const CaruselId = req.params.id;

    if (!Titulli || !Teksti || !Photo) {
        return res.status(400).json({ error: "Missing required fields" }).end();
    }

    try {
        const carusel = await Carusel.findByPk(CaruselId);
        if (!carusel) {
            return res.status(404).json({ error: "Carusel not found" }).end();
        }

        carusel.Titulli = Titulli;
        carusel.Teksti = Teksti;
        carusel.Photo = Photo;
        await carusel.save();

        res.status(200).json({ message: "Carusel updated" }).end();
    } catch (error) {
        console.error("Error updating carusel:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Delete a carusel by ID (delete)
const deleteCarusel = async (req, res) => {
    const CaruselId = req.params.id;

    try {
        const result = await Carusel.destroy({ where: { CaruselId } });
        if (result) {
            res.status(200).json({ message: "Carusel deleted" }).end();
        } else {
            res.status(404).json({ message: "Carusel not found" }).end();
        }
    } catch (error) {
        console.error("Error deleting carusel:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

module.exports = { insertCarusel, getCarusel, getCaruselForEdit, updateCarusel, deleteCarusel };
