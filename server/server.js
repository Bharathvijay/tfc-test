var express = require('express');
var bodyParser = require('body-parser');
var md5 = require('md5');
var app = express();
var server = require('http').createServer(app);
var router = express.Router();
var port = 8000;
var global_count = 0, request_no = 0, old_global_count = 0;
var request = {};
var hash = require('./lib/hash');
var count = require('./lib/counter');
var gc = require('./lib/globalCounter');

server.listen(port, function () {
    'use strict';
    console.log("Listening to port: " + port);
});

app.use(express.static('../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/jstest', function (req, res) {
    'use strict';
    res.sendFile("index.html", {"root": '../client'});
});

app.post('/api/hash', function(req,res){
	request_no += 1;			
	//var hash_op = md5(req.body.val);
	res.json(hash.hasher(request_no, req.body.option,
	 req.body.val));
	// res.json({ 
	// 	'type': req.body.option,
	// 	'req_no': request_no,
	// 	'output': {
	// 		'Input' : req.body.val,
	// 		'Output' : hash_op
	// 	}});
});

app.post('/api/counter', function(req,res){
	request_no += 1;
	var input = parseInt(req.body.val);
	res.json(count.counter(request_no, req.body.option, input));
	// var data = input + 1 ;
	// res.json({
	// 	'type': req.body.option,
	// 	'req_no': request_no,
	// 	'output': {
	// 		'Input' : input,
	// 		'Output' : data
	// }});
});

app.post('/api/global-counter', function(req,res){
	request_no += 1;
	var input = parseInt(req.body.val);
	var gc_out = gc.globalCounter(request_no, req.body.option, old_global_count,
			input);
	old_global_count = gc_out.output.Output;
	res.json(gc_out);
	// var temp_old_count = old_global_count;
	// global_count = global_count + input;
	// old_global_count = global_count;
	// res.json({
	// 	'type' : req.body.option,
	// 	'req_no': request_no,
	// 	'output' : {
	// 		'Input' : input,
	// 		'PreviousCounter' : temp_old_count,
	// 		'Output' : global_count
	// }});
});