const express = require('express');
const router = express.Router();

router.use('/user', require('./user/user_routes.js'));
router.use('/trip', require('./trip/trip_routes.js'));
router.use('/moment', require('./moment.js'));

module.exports = router;
