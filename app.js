var express = require('express');
var app = express();
var referrerPolicy = require('referrer-policy')
var bodyParser = require('body-parser')

app.use(referrerPolicy({ policy: 'unsafe-url' }))
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




let requests = []

// respond with "hello world" when a GET request is made to the homepage
app.get('/request', function(req, res) {
	res.send(requests)
	res.send("hallo world")
});

app.post('/request', function(req,res) {
	var message = req.body.message;
	var name = req.body.name;
	var email = req.body.email;
	var title = req.body.title;
	requests.push({"name" : name, "email" : email, "title" : title, "message" : message})
	res.send("Thanks for your message.")
})

let port = 8080;
app.listen(port, function(){
	console.log("server running")
	//Something to do when the server starts.
});


