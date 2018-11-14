const express = require('express');
const router = express.Router();
// const jwt = require('../../module/jwt.js');
const upload = require('../../config/multer');
const trip = require('../schema/trip');
const pool = require('../../module/pool.js');

var multiUpload = upload.fields([{ name: 'img'}]);

router.post('/', multiUpload, async (req, res, next) => {
    // const ID = jwt.verify(req.headers.authorization); //토큰 적용
    let imgArray = [];
    let dates = [];
    const SELECT_USER = 'SELECT user_idx FROM USER WHERE email = ?';
    let select = await pool.queryParam_Arr(SELECT_USER, req.body.email);

    for (let i = 0 ; i < req.files.img.length ; i++) {
	  imgArray.push(req.files.img[i].location);
	}

    for (let i = 0 ; i < req.body.dates.length ; i++) {
      dates.push(new Date(req.body.dates[i]));
    }
    
    if (select) {
        await trip.create({
            user_idx     : select[0].user_idx,
            total_cnt    : req.body.total_cnt,
            places       : req.body.places,
            dates        : dates,
            details      : req.body.details,
            lats         : req.body.lats,
            longs        : req.body.longs,
            img_urls     : imgArray,
            hash_tags    : req.body.hash_tags,
            img_cnts     : req.body.img_cnts,
            hash_tag_cnts: req.body.hash_tag_cnts,
            share_users  : req.body.share_users
        }, async function (err, trips) {
            if (err) {
                res.status(405).send({
                    message: "Database Failure"
                });
                return;
            }

            res.status(201).send({
                message: "Successfully Upload trip"
            }); 
        });
    } else {
        res.status(401).send({
            message: "Not Exist User"
        });
    }
});

module.exports = router;

    