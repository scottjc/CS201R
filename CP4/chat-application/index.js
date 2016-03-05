var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
 
// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, 'index.html'));//define the place where root is.
  console.log(__dirname);

});
 
// Register events on socket connection
io.on('connection', function(socket){
  socket.on('chatMessage', function(from, msg, userpic){
    io.emit('chatMessage', from, msg, userpic);
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
  socket.on('newmessage', function(user, joinedmessage){
    io.emit('newmessage', user, joinedmessage);
  });
});
 
// Listen application request on port 3001, just so we don't confilct with others.
http.listen(3000, function(){
  console.log('listening on *:3000');
});