/*const db = require('../../db');

const insertInfoSection = (req, res) => {
    const { Info } = req.body;

    const sql = "INSERT INTO InfoSection (Info) VALUES (?)";
    db.query(sql, [Info], (err, result) => {
        if (err) {
            console.error("Error adding goal:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Goal added successfully");
        return res.status(200).json("success").end();
    });
};

const getInfoSection = (req, res) => {
    const sql = "SELECT * FROM InfoSection";

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
const getInfoForEdit = (req, res) =>{
    const InfoSectionId = req.params.id;
    const sql = "SELECT * FROM InfoSection where InfoSectionId=?";
    db.query(sql, [InfoSectionId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Carusel not found" }).end();
        }
    });
}
const updateInfo =(req, res) => {
    const {Info} = req.body;
    const InfoSectionId = req.params.id;
    sql="UPDATE InfoSection SET Info = ? where InfoSectionId = ?";
    db.query(sql, [Info, InfoSectionId], (err, result) => {
        if (err) {
            console.error("Error updating Infosection:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Infosection updated successfully");
        return res.status(200).json("success").end();
    });
}
const deleteInfo = (req, res) => {
    const CaruselId = req.params.id;
    const sql = "DELETE FROM InfoSection WHERE InfoSectionId = ?";
    db.query(sql, [CaruselId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (result.affectedRows > 0) {
            return res.status(200).json('success').end();
        } else {
            return res.status(204).json({ message: "Carousel item not found" }).end();
        }
    });
};
module.exports = { insertInfoSection,getInfoSection,getInfoForEdit,updateInfo,deleteInfo };
*/

const { InfoSection } = require('../../Models/InfoSection');
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

// Insert a new info section (create)
const insertInfoSection = async (req, res) => {
    const { Info } = req.body;
    
    if (!Info) {
        return res.status(400).json({ error: "Missing Info" }).end();
    }

    try {
        const newInfoSection = await InfoSection.create({ Info });
        res.status(200).json({ message: "Info section created", data: newInfoSection }).end();
    } catch (error) {
        console.error("Error creating info section:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Get all info sections (findAll)
const getInfoSection = async (req, res) => {
    try {
        const infoSections = await InfoSection.findAll();
        if (infoSections.length > 0) {
            res.status(200).json(infoSections).end();
        } else {
            res.status(204).json({ message: "No info sections found" }).end();
        }
    } catch (error) {
        console.error("Error fetching info sections:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Get a single info section by ID (findOne)
const getInfoForEdit = async (req, res) => {
    const InfoSectionId = req.params.id;

    try {
        const infoSection = await InfoSection.findByPk(InfoSectionId);
        if (infoSection) {
            res.status(200).json(infoSection).end();
        } else {
            res.status(404).json({ message: "Info section not found" }).end();
        }
    } catch (error) {
        console.error("Error fetching info section:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Update an info section by ID (update)
const updateInfo = async (req, res) => {
    const { Info } = req.body;
    const InfoSectionId = req.params.id;

    if (!Info) {
        return res.status(400).json({ error: "Missing Info" }).end();
    }

    try {
        const infoSection = await InfoSection.findByPk(InfoSectionId);
        if (!infoSection) {
            return res.status(404).json({ error: "Info section not found" }).end();
        }

        infoSection.Info = Info;
        await infoSection.save();
        
        res.status(200).json({ message: "Info section updated" }).end();
    } catch (error) {
        console.error("Error updating info section:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

// Delete an info section by ID (delete)
const deleteInfo = async (req, res) => {
    const InfoSectionId = req.params.id;

    try {
        const result = await InfoSection.destroy({ where: { InfoSectionId } });
        if (result) {
            res.status(200).json({ message: "Info section deleted" }).end();
        } else {
            res.status(404).json({ message: "Info section not found" }).end();
        }
    } catch (error) {
        console.error("Error deleting info section:", error);
        res.status(500).json({ error: "Internal server error" }).end();
    }
};

module.exports = { insertInfoSection, getInfoSection, getInfoForEdit, updateInfo, deleteInfo };
