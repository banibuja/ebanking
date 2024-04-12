const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");


const app = express();
app.use(cors({
    origin: ["http://localhost:3000"], 
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false
    }

}))

app.get('/sessionTimeRemaining',  (req, res) => {
    if (req.session && req.session.username) {
        const now = new Date().getTime();
        const expireTime = req.session.maxAge;
        // const sessionExpire = req.session.lastActivity + expireTime;
        if (now > expireTime) {
            req.session.expired = true;
            return res.json({ timeRemaining: 0 });
        } else {
            const timeRemaining = Math.round((expireTime - now) / 1000);
            console.log(timeRemaining);
            return res.json({ timeRemaining });
        }
    } else {
        return res.status(401).json({ error: "User session not found" });
    }
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "e-banking"
})
db.connect((err) => {
    if (err) {
        console.error('DB not connect:', err);
    } else {
        console.log('DB: okey');
    }
});

db.on('error', (err) => {
    console.error('Gabim lidhjen me databaze:', err);
});

app.get('/',  (req, res) => {
    if(req.session.username){
        return res.json({ valid: true, uId: req.session.uId, username: req.session.username, role: req.session.role })
    } else {
        return res.json({ valid: false, sessionExpired: req.session.expired }); 
});
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            res.json({ success: false });
        } else {
            res.clearCookie('connect.sid'); 
            res.json({ success: true });
        }
    });
});
app.post('/Alogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ?  AND  password = ?";
    const date = new Date();
    expireDate = date.setMinutes(date.getMinutes() + 15)
    db.query(sql,[req.body.email,  req.body.password], (err,result) => {
        if(err) return res.json({Message:"Email or Password is incorrect!"});
        
        if(result.length > 0){
            req.session.uId = result[0].id;
            req.session.username = result[0].username;
            req.session.role = "admin";
            req.session.maxAge = + expireDate;
            console.log(req.session.username);
            return res.json({Login: true})
        } else {
            return res.json({Login: false});
        }
        
    })
})app.post('/signup', (req, res) => {
    const banknumber = "2223" + Math.floor(1000 + Math.random() * 9000);
      const accountNumber = '';
    const sql = "INSERT INTO loginRegister (`name`,`lastname`,`banknumber`,`account`,`email`,`password`,`dateb`,`gender`,`phonenumber`)  VALUES (?, ?, ?, ?, ?, ?, ?,?,?)";
    const values = [
        req.body.name,
        req.body.lastname,
        banknumber, 
        accountNumber,
        req.body.email,
        req.body.password,
        req.body.dateb,  
        req.body.gender,
        req.body.phonenumber
    ]
      db.query(sql, [...values], (err, result) => {
        if(err) return res.json({Message:"Error!!"});
        return res.json(result);
    })
})

app.post('/getUsers', (req, res) => {
    const sql = "SELECT * FROM loginRegister";


    db.query(sql, (err, data) => {
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0) {
            return res.json(data);
        } else {
            return res.json("faile");
        }
    })
})

app.delete("/deleteUsers/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM loginRegister WHERE id = ?";
  
    db.query(sql, id, (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
    });
});




app.put('/updateUsers/:id', (req, res) => {
    const userId = req.params.id;
    const { name, lastname, email, account, password, dateb, gender, phonenumber } = req.body;
    const sqlUpdate =  "UPDATE loginRegister SET name=?, lastname=?, email=?, account=?, password=?, dateb=?, gender=?, phonenumber=? WHERE id=?"

    db.query(sqlUpdate, [name, lastname, email, account, password, dateb, gender, phonenumber, userId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Internal server error" });
        }

        return res.status(200).json({ message: "User updated successfully" });
    });
});


app.listen(8080, () => {
    console.log("Server is running");
    });