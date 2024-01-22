const express = require('express');
const router = express.Router();
const payoutController = require('../controllers/PayoutsController');

router.post('/payouts/upload', payoutController.uploadPayouts);

module.exports = router;