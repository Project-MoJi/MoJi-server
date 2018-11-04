const express = require('express');
const router = express.Router();

router.use('/user', require('./user/index.js'));
router.use('/moment', require('./moment.js'));

module.exports = router;
