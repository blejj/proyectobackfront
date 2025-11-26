const express = require('express');
const router = express.Router();
const { createPaymentPreference } = require('../controller/payment.controller');

// POST /api/payment/create-payment-preference
router.post('/create-payment-preference', createPaymentPreference);

module.exports = router;
