
const db = require('../../db');

const insertInfoSection = (req, res) => {
    const { Info } = req.body;

    const sql = "INSERT INTO InfoSection (Info) VALUES (?)";
    db.query(sql, [Info], (err, result) => {
        if (err) {
            console.error("Error adding info:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Info added successfully");
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
            return res.status(204).json("No content").end();
        }
    });
};

const getInfoForEdit = (req, res) => {
    const InfoSectionId = req.params.id;
    const sql = "SELECT * FROM InfoSection WHERE InfoSectionId = ?";

    db.query(sql, [InfoSectionId], (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data[0]).end();
        } else {
            return res.status(204).json({ message: "Info section not found" }).end();
        }
    });
};

const updateInfo = (req, res) => {
    const { Info } = req.body;
    const InfoSectionId = req.params.id;
    const sql = "UPDATE InfoSection SET Info = ? WHERE InfoSectionId = ?";

    db.query(sql, [Info, InfoSectionId], (err, result) => {
        if (err) {
            console.error("Error updating info section:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("Info section updated successfully");
        return res.status(200).json("success").end();
    });
};

const deleteInfo = (req, res) => {
    const InfoSectionId = req.params.id;
    const sql = "DELETE FROM InfoSection WHERE InfoSectionId = ?";

    db.query(sql, [InfoSectionId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (result.affectedRows > 0) {
            return res.status(200).json('success').end();
        } else {
            return res.status(204).json({ message: "Info section not found" }).end();
        }
    });
};

module.exports = {
    insertInfoSection,
    getInfoSection,
    getInfoForEdit,
    updateInfo,
    deleteInfo
};
