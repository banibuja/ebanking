const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken'); 
require('dotenv').config();
const defineRoutes = require('./controllers/AllControllers');
const db = require('./db'); 



const app = express();

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(bodyParser.json());

defineRoutes(app);


app.get('/', (req, res) => {
    const token = req.cookies.authToken;
    
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.json({ valid: false, sessionExpired: req.session.expired });
        } else {
            return res.json({ valid: true, uId: decoded.uId, username: decoded.username, role: decoded.role });
        }
      });

});

app.get('/logout', (req, res) => {
    console.log('loged out');
    res.clearCookie('connect.sid');
    res.clearCookie('authToken').send('Logged out successfully');
});






app.listen(8080, () => {
    console.log("Server is running");
});
