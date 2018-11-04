const express = require('express');
const router = express.Router();

const request=require('async-request');
const crypto = require('crypto-promise');		// crypto 모듈의 promise 버전
const db = require('../../module/pool.js');

// POST 방식, ip:3000/signup
router.post('/', async function (req, res) {
	let email 		 = req.body.email;
	let nickname   = req.body.nickname;
	let pw 				 = req.body.pw;
	let resultJson = {
		message : ""
	}
	let checkQuery  = 'SELECT * FROM USER WHERE email = ? or nickname = ?';		// 입력받은 id DB에 존재하는지 확인
	let checkResult = await db.queryParam_Arr(checkQuery, [email, nickname]);  
	
	if (!checkResult) {
		resultJson.message = "Internal Server Error";
		res.status(500).send(resultJson);
		return;
	} else if (checkResult.length >= 1) { 
		if (email === checkResult[0].email) resultJson.message = "Already Exists email";
		if (email === checkResult[1].nickname) resultJson.message = "Already Exists nickname";

		res.status(201).send(resultJson);
		return;
	}

	const salt 		   = await crypto.randomBytes(32);			// salt
  const hashedpwd  = await crypto.pbkdf2(pw, salt.toString('base64'), 100000, 32, 'sha512');		// password 해싱

	let insertQuery  = 'INSERT INTO USER (email, nickname, pw, salt) VALUES (?, ?, ?, ?)';
	let insertResult = await db.queryParam_Arr(insertQuery, [email, nickname, hashedpwd.toString('base64'), salt.toString('base64')]);

	if (!insertResult) {	
		resultJson.message = "Internal Server Error";
		res.status(500).send(resultJson);
	} else {
			resultJson.message = "Successfully Sign Up";
			res.status(201).send(resultJson);
	}
});

module.exports = router;