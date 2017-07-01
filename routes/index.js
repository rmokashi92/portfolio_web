var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb://localhost:27017/mydata';

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Welcome' ,username : 'Username', password : 'Password', layout : 'loginlayout'});
  res.render('index',{title:'Welcome', link1 : 'New User? Register!' ,link2: 'Existing user? Login!'});
});


router.get('/registerUser', function(req, res, next) {
  //res.render('index', { title: 'Welcome' ,username : 'Username', password : 'Password', layout : 'loginlayout'});
  res.render('registerUser',{title:'Sign up Today!', firstName : 'FirstName', lastName : 'LastName' ,
   username : 'Username', password : 'Password', email : 'Email'});
});

router.post('/success',function(req,res,next){
	var user = {
		firstName : req.body.fname,
		lastName : req.body.lname,
		userName : req.body.uname,
		email : req.body.ename,
		password : req.body.pwd
	};

	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		db.collection('user-data').insert(user);
	});
});


router.get('/success',function(req,res,next){
	res.render('success',{title : 'Account created Successfully!',link1 : 'To Login Page!'});
});



module.exports = router;
