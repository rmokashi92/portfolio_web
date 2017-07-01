
var express = require('express');
var router = express.Router();

//Getting the Login Page
router.get('/',function(req,res,next){
	res.render('login', { title: 'Login Page' ,username : 'Username', password : 'Password'});
});

module.exports = router;