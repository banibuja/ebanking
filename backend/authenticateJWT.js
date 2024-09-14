

// const jwt = require('jsonwebtoken');

// const authenticateJWT = (req, res, next) => {
//     const token = req.header('Authorization')?.split(' ')[1]; // Merrni token nga headeri "Authorization"

//     if (!token) {
//         return res.status(401).json({ error: 'Access token is required' });
//     }

//     jwt.verify(token, 'your-secret-key', (err, user) => {
//         if (err) {
//             return res.status(403).json({ error: 'Invalid or expired token' });
//         }

//         req.user = user; // Shto përdoruesin në kërkesë
//         next();
//     });
// };

// module.exports = authenticateJWT;
