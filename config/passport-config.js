const passport = require('passport');
const express = require('express');
const router = express.Router();
const pool=require('./dbPool.js');

router.use(session({
	secret : "slkfnalgralwbglawkrbglkargb",
	resave : true,
	saveUninitialized : true,
	cookie : {maxAge : 3600000, httpOnly : true},
	store : pool,
	rolling : true
}));

router.use(helmet.hsts({
	maxAge : 10886300000,
	includeSubdomains : true
}));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done){
	done(null, user.id);
});