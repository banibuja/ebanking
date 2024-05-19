const express = require('express');
const { getLoans, insertLoan } = require('../components/Dashboard/Loans/Loans');
const router = express.Router();

router.get('/loans', getLoans);
router.post('/loans', insertLoan);

module.exports = router;
