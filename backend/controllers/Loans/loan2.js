// const express = require('express');
// const db = require('../../db');
// // const jwt = require('jsonwebtoken')

// // const app = express();

// app.get('/users-list', (req, res) => {
//   // Get complete list of users
//   const usersList = [];
    
//   // Send the usersList as a response to the client
//   res.send('hello world');
// });

// app.get('/editLoans2/:id', (req, res) => {
//     console.log('correct')
//         const loanID = req.params.id;
//         const sql = "SELECT * FROM applyloans WHERE LoanID = ?";
    
//         db.query(sql, [loanID], (err, data) => {
//             if (err) {
//                 return res.status(500).json({ error: "Internal server error" }).end();
//             }
//             if (data.length > 0) {
//                 return res.status(200).json(data[0]).end();
//             } else {
//                 return res.status(204).json({ message: "Loan not found" }).end();
//             }
//         });
//     });

    