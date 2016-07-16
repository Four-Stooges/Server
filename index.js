var express = require('express');
var fileupload = require('express-fileupload');
var util = require('util');
var path = require('path');

var app = express();
app.use('/',express.static(__dirname+'/public'))

app.use(fileupload());

var usr;

//Starting point of the server
app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/resources/html/index.html');
});

//Normal user authentication page
app.get('/userLogin', function(req,res){
	res.redirect('/');
});

//Authenticate the normal user
app.post('/userLogin', function(req,res){
	testName =  req.body.email;
	testPwd = req.body.pwd;

	//Invoking the API to check for user login
	var exec = require('child_process').exec('python3 ./public/resources/scripts/user_auth.py  ' + parameters ,function(error,stdout,stderr){
	});
	exec.on('exit',function(code){
		if(code == 0 ){
			usr = testName;
			res.sendFile(__dirname + '/public/resources/html/userhome.html');
		}
		else{
			//res.sendFile(__dirname + '/invaliduser.html');
			res.send('Invalid');
		}
	});
});

//NGO authentication page
app.get('/userNGO', function(req,res){
	res.redirect('/');
});

//Authenticat NGO credentials
app.post('/userNGO', function(req,res){
	// testName =  req.body.uname;
	// testPwd = req.body.password;

	// // Invoking the API to check for user login
	// var exec = require('child_process').exec('python3 ../APIs/auth_ngo.py ' +  testName + ' ' + testPwd,function(error,stdout,stderr){
	// });
	// exec.on('exit',function(code){
	// 	if(code == 0 ){
	// 		res.send('Valid');
	// 		//res.sendFile(__dirname + '/validngo.html');
	// 		res.sendFile(__dirname + '/ngohome.html');
	// 	}
	// 	else{
	// 		//res.sendFile(__dirname + '/invalidngo.html');
	// 		res.send('Invalid');
	// 	}
	// });
	res.sendFile(__dirname + '/public/resources/html/ngohome.html');
});

// Handling a new register request
app.get('/registerUser', function(req,res){
	res.sendFile(__dirname + '/public/resources/html/registerUser.html');
});

// Registering a new user
app.post('/registerUser', function(req,res){
	 userEmail   = req.body.email;
	 password   = req.body.pwd;
	 userName  = req.body.name;
	 contactNo    = req.body.contact;
	 parameters = userEmail+' '+password+' '+userName+' '+contactNo;
	 console.log('calling subprocess : ' + 'python3 ./public/resources/scripts/register_user.py  ' + parameters)
	 var exec = require('child_process').exec('python3 ./public/resources/scripts/register_user.py  ' + parameters, function(error,stdout,stderr){});
	 exec.on('exit',function(code){
	 	if(code == 0){
	 		res.redirect('/');
	 	}
	 	else{
	 		res.send('Error. Unable to upload!!');
	 	}
	 });
});

// Handling a new NGO register request
app.get('/registerNGO', function(req,res){
	res.sendFile(__dirname + '/public/resources/html/registerNGO.html');
});

// Registering a new NGO
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

// Handling request to upload a new person
app.get('/upload', function(req,res){
	res.sendFile(__dirname + '/public/resources/html/upload.html');
});

// Uploading a new person
app.post('/upload',function(req,res){
	if(!req.files){
		res.send('No files were uploaded.');
		return;
	}
	var file = req.files.image;
	var timeInMss = Date.now();
	var extension = path.extname(req.files.image.name);
	var newName = String(timeInMss)+extension;
	file.mv(__dirname + '/public/resources/images/'+ newName, function(err){
		if(err){
			res.status(500).send(err);
		}
		else{
			var lat = req.body.lat;
			var long = req.body.long;
			var parameters = newName+' '+lat+' '+long;
			var exec = require('child_process').exec('python3 ./public/resources/scripts/upload.py '+parameters, function(error,stdout,stderr){});
			exec.on('exit', function(code){
				if(code == 0)
					res.sendFile(__dirname + '/public/resources/html/added.html');
				else{
					res.send('Error Occurred!! Not able to upload');
				}
			})
		}
	});
});

app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');