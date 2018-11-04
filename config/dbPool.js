const mysql = require('promise-mysql');			// mysql 모듈의 promise 버전

// rds 정보 입력 : hostname, username, password, default DB
const dbConfig = {
	host : 'mojidb.cifqhov2mha4.ap-northeast-2.rds.amazonaws.com',
	port : 3306,
	user : 'moji',
	password : 'moji2514',
	database : 'mojidb',
	connectionLimit : 20
};

module.exports = mysql.createPool(dbConfig);	// connection pool을 module화