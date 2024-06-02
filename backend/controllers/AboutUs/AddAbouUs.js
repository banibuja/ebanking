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
        return res.status(200).json("success").end();
    });
};


const getAboutUs = (req, res) => {
    const sql = "SELECT * FROM AboutUs";

    db.query(sql, (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        if (data.length > 0) {
            return res.status(200).json(data).end();
        } else {
            return res.status(204).json("No response").end();
        }
    });
};

const getAboutUsEdit = (req, res) =>{
    const AboutUsId = req.params.id;
    const sql = "SELECT * FROM AboutUs where AboutUsId=?";
    db.query(sql, [AboutUsId], (err, data) => {
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
const updateAboutUs =(req, res) => {
    const {Tittle,Info} = req.body;
    const AboutUsId = req.params.id;
    sql="UPDATE AboutUs SET Tittle = ? ,Info = ? where AboutUsId = ?";
    db.query(sql, [Tittle, Info, AboutUsId], (err, result) => {
        if (err) {
            console.error("Error updating AbouUs:", err);
            return res.status(500).json({ error: "Internal server error" }).end();
        }
        console.log("AboutUs updated successfully");
        return res.status(200).json("success").end();
    });
}
const deleteAboutUs = (req, res) => {
    const AboutUsId = req.params.id;
    const sql = "DELETE FROM AboutUs WHERE AboutUsId = ?";
    db.query(sql, [AboutUsId], (err, result) => {
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
module.exports = { insertAboutUs,getAboutUs,getAboutUsEdit,updateAboutUs,deleteAboutUs};
