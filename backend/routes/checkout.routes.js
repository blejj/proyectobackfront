const express = require('express');
const { addCard, deleteCard } = require('../controller/checkout.controller');

const router = express.Router();

router.post('/', addCard);
router.delete('/:id', deleteCard);

module.exports = router;
