const db = require('../../db');

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
