var express = require('express');
var fileupload = require('express-fileupload');
var app = express();

app.use(fileupload());

app.get('/',function(req,res){
	res.sendFile(__dirname+'/public/resources/html/index.html');
});

app.get('/userLogin', function(req,res){
	res.sendFile(__dirname+'/public/resources/html/userLogin.html');
});

app.post('/userLogin', function(req,res){
	data = {
		user_name : req.body.uname,
		password : req.body.password
	};
	res.send(JSON.stringify(data));
});
app.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');