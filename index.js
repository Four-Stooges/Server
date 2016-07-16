var express = require('express');
var fileupload = require('express-fileupload');
var util = require('util');

var app = express();


app.use(fileupload());


//Starting point of the server
app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/resources/html/index.html');
});

//Normal user authentication page
app.get('/userLogin', function(req,res){
	res.sendFile(__dirname+'/public/resources/html/userLogin.html');
});

//Authenticate the normal user
app.post('/userLogin', function(req,res){
	testName =  req.body.uname,
	testPwd = req.body.password

	// Invoking the API to check for user login
	var exec = require('child_process').exec('python3 ../APIs/auth_user.py ' +  testName + ' ' + testPwd,function(error,stdout,stderr){
	});
	exec.on('exit',function(code){
		if(code == 0 ){
			res.send('Valid');
			//res.sendFile(__dirname + '/validuser.html');
			//res.sendFile(__dirname + '/userhome.html');
		}
		else{
			//res.sendFile(__dirname + '/invaliduser.html');
			res.send('Invalid');
		}
	});
});

//NGO authentication page
app.get('/userNGO', function(req,res){
	res.sendFile(__dirname+'/public/resources/html/ngoLogin.html');
});

//Authenticat NGO credentials
app.post('/userNGO', function(req,res){
	testName =  req.body.uname;
	testPwd = req.body.password;

	// Invoking the API to check for user login
	var exec = require('child_process').exec('python3 ../APIs/auth_ngo.py ' +  testName + ' ' + testPwd,function(error,stdout,stderr){
	});
	exec.on('exit',function(code){
		if(code == 0 ){
			res.send('Valid');
			//res.sendFile(__dirname + '/validngo.html');
			//res.sendFile(__dirname + '/ngohome.html');
		}
		else{
			//res.sendFile(__dirname + '/invalidngo.html');
			res.send('Invalid');
		}
	});
});

app.get('/registerUser', function(req,res){
	res.sendFile(__dirname + '/public/resources/html/registerUser.html');
});

app.post('/registerUser', function(req,res){
	 userName   = req.body.email;
	 password   = req.body.pwd;
	 firstName  = req.body.fname;
	 lastName   = req.body.lname;
	 phoneNo    = req.body.phone;
	 parameters = userName+' '+password+' '+fname+' '+lname+' '+phone;
	 var exec = require('child_process').exec('python3 ../APIs/user_db.py ' + parameters, function(error,stdout,stderr){});
	 exec.on('exit',function(code){
	 	if(code == 0){
	 		res.sendFile(__dirname + '/public/resources/html/success.html');
	 	}
	 	else{
	 		res.send('404 Error. Unable to upload!! ');
	 	}
	 });
});

app.get('/registerNGO', function(req,res){
	res.sendFile(__dirname + '/public/resources/html/registerNGO.html');
});

app.post('/registerNGO', function(req,res){
	 userName   = req.body.email;
	 password   = req.body.pwd;
	 parameters = userName+' '+password;
	 var exec = require('child_process').exec('python3 ../APIs/ngo_db.py ' + parameters, function(error,stdout,stderr){});
	 exec.on('exit',function(code){
	 	if(code == 0){
	 		res.sendFile(__dirname + '/public/resources/html/success.html');
	 	}
	 	else{
	 		res.send('404 Error. Unable to upload!! ');
	 	}
	 });
});
app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');