const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) =>{
	let newUser = new User({
		name: req.body.name,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password,
		lat: req.body.lat,
		lng: req.body.lng,
		rating: 'five'
	});

	User.addUser(newUser, (err, user)=>{
		if(err){
			res.json({success: false, msg:'Failed to register User'});
		}else{
			res.json({success: true, msg:'User Registerd'});
		}
	});
});

router.put('/update', passport.authenticate('jwt', {session: false}),(req, res, next) =>{

		userId = req.body.rating;
		console.log(userId);
		// rating = req.params.rating;

		// Users.findOne({_id: userId}, function(err, user){
		// 	if(err || Object.keys(user).length<1)
 	// 		// throw error
		// 	else
		// 	//update user property and then call Users.save(user)
		// })
		// Users.update({_id: userId}, {$set: {rating: req.body.rating}}, function(err, result) {});

	});




//Authentication
router.post('/authenticate', (req, res, next) =>{
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) =>{
		if(err) throw err;
		if(!user){
			return res.json({success: false, msg: 'User not found'});
		}
		User.comparePassword(password, user.password, (err, isMatch)=>{
			if(err) throw err;
			if(isMatch){
				const token = jwt.sign(user, config.secret, {
					expiresIn: 604800
				});

				res.json({
					success: true,
					token: 'JWT ' + token,
					user: {
						id: user._id,
						name: user.username,
						email: user.email
					}
				});
			}else{
				return res.json({success: false, msg: 'Wrong password'});
			}
		});
	});
});

//Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
	res.json({user: req.user});
});


router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
	res.json({user: req.user});
});



module.exports = router;
