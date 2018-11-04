const express = require('express');
const router = express.Router();

const moment = require('moment');

router.get('/', function(req, res) {
	let current_time = moment().format('YYYY-MM-DD HH:mm:ss');
	
	console.log(current_time);

	res.status(200).send({
		message : "Success",
		data : current_time
	});
});

module.exports = router;