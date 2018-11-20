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
let urls = []

// respond with "hello world" when a GET request is made to the homepage
app.get('/request', function(req, res) {
	res.send(requests)
	res.send("hallo world")
});

app.post('/request', function(req,res) {
	requests.push({"name" : req.body.name, "email" : req.body.email, "title" : req.body.title, "message" : req.body.message})
	res.send("Thanks for your message.")
})


app.post('/url', function(req,res) {
	urls.push(req.body.url)
	res.setHeader('Content-Type', 'application/json');
    	res.send(JSON.stringify({ url : req.body.url }));
})


app.get('/url', function(req,res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({ urls : urls  }));
})

let port = 3000;
app.listen(port, function(){
	console.log("server running")
	//Something to do when the server starts.
});


