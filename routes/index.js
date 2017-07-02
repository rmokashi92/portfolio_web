var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var assert = require('assert');
var mongodb = require('mongodb').MongoClient;


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

/*router.get('/success',function(req,res,next){
	res.render('success',{title : 'Account created Successfully!',link1 : 'To Login Page!'});
});*/


	router.post('/verify',function(req,res,next){

		mongo.connect(url,function(err,db){
			assert.equal(null,err);
			var query = {username : req.body.uname};
			db.collection("loginData").find(query).toArray(function(err, result) {
   			 if (err) throw err;
    		var pass = result[0].password;
    		if(pass == req.body.pwd){
    			res.render('home', {title: 'Hello,' , username : req.body.uname});
    		}
    		else{
    			res.render('login', { title: 'Login Page' ,username : 'Username', password : 'Password'});
    		}
    		db.close();
    	});
		});

	});



router.post('/register',function(req,res,next){
	var user = {
		firstName : req.body.fname,
		lastName : req.body.lname,
		userName : req.body.uname,
		email : req.body.ename,
		password : req.body.pwd
	};
	var login = {
		username : req.body.uname,
		password : req.body.pwd
	};

	mongo.connect(url,function(err,db){
		assert.equal(null,err);
		db.collection('userData').insertOne(user,function(err,result){
			assert.equal(null,err);
			console.log('Inserted Successfully');
		});
		db.collection('loginData').insertOne(login,function(err,result){
			assert.equal(null,err);
			console.log('Inserted in Login!');
			db.close();
			//res.render('index',{title:'Welcome', link1 : 'New User? Register!' ,link2: 'Existing user? Login!'});
			res.render('success',{title : 'Account created Successfully!',link1 : 'To Login Page!'});
		});
	});
});


module.exports = router;
