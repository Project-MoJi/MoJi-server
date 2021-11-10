const express = require('express');
const router = express.Router();

router.use('/signup', require('./signup.js'));
router.use('/signin', require('./signin.js'));

module.exports = router;