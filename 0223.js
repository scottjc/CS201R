var http = require('http');
var url = require('url');
var express = require('express');

var server = http.createServer(function (req, res){
	console.log(request.url);
	var parsedUrl = url.parse(req.url, true);
	console.log(parsedUrl);

	response.writeHead(200, {'Content-Type': 'application/json'});
	var result = [{city:'Provo'}, {city:'Price'}];
	response.end(JSON.stringify(result));
});
server.listen(3000);
