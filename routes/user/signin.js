const express = require('express');
const router  = express.Router();
const request = require('async-request');
const crypto  = require('crypto-promise');		// crypto 모듈의 promise 버전
const db 		  = require('../../module/pool.js');

router.post('/', async (req, res) => {
	let email = req.body.email;
	let pw 		= req.body.pw;
	let resultJson = {
		message : "",
		nickname : ""
	}

	let checkQuery  = 'SELECT * FROM USER WHERE email = ?';
	let checkResult = await db.queryParam_Arr(checkQuery, [email]);	

	// 정상적으로 query문이 수행되지 않았을 경우
	if (!checkResult) {
		resultJson.message = "Internal Server Error";
		res.status(500).send(resultJson);

		return;
	}
	
	if (checkResult.length !== 1) {
		resultJson.message = "Login Failed";
		res.status(200).send(resultJson);

		return;
	}

	// id 가 존재하는 경우
	let hashedPwd = await crypto.pbkdf2(pw, checkResult[0].salt, 100000, 32, 'sha512');
	if (hashedPwd.toString('base64') === checkResult[0].pw) {	
		resultJson.message  = "Login Success";
		resultJson.nickname = checkResult[0].nickname;
		res.status(201).send(resultJson);
	} 
});

module.exports = router;