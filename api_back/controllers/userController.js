const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const secret = 'pro06';
const jwt = require('jsonwebtoken');

exports.signup = function(req, res, next) {
    // req.body.email, req.body.password, req.body.firtName, req.body.lastName, 
    
    User.findOne({email:req.body.email}, (err, existingUser)=> {
        if(err) {
			console.log('error bdd ', err)
			return next(err);
		}
		
		if (existingUser) {
			res.json({status: 422, error: "Email déjà utilisé"})
		} else {
		    const user = new User({
				email: req.body.email,
				password: req.body.password,
				firstName: req.body.firstName,
				lastName: req.body.lastName
			});
			
			user.save(function(err) {
				
				if(err) {
					console.log('erreurrrr', err)
					return next(err);
					
				}

				res.json({status: 200, success: "bien enregistré"});
			});
		}
    })
    
}

exports.signin = function(req, res, next) {
    User.findOne({email:req.body.email}, (err, existingUser)=> {
        if(err) {
			console.log('error bdd ', err)
			return next(err);
		}
		
		if(existingUser) {
		    bcrypt.compare(req.body.password, existingUser.password)
		        .then((isMatch)=>{
					if(isMatch) {
						const payload = { email: req.body.email };
						const token = jwt.sign(payload, secret, {
				            expiresIn: '10d'
				         });
						res.json({status: 200, msg: 'good password', token: token});
					}
				})
		} else {
		    res.json({status: 404, error: "Pas d'utilisateur avec cet email"})
		}
        
    })
}

exports.checkToken = async function(req, res, next) {
    const token = req.headers['x-access-token']
	let decode = await jwt.verify(token, secret)
	let user = await User.findOne({email:decode.email})
	
	res.json({
	     		status: 200,
	            user: user,
	            msg: 'token valide'
	        })

    
}