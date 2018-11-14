const express = require('express');
const router = express.Router();

router.use('/postTrip', require('./postTrip.js'));
// router.use('/getTrip', require('./getTrip.js'));

module.exports = router;