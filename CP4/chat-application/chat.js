var socket = io();
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);
});

//Displays right when you start.
$(document).ready(function(){
  var name = makeid();
  var pic = makepic();
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
  //alert("Hiya!");
});

//Generates a random username 
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

//Generates a random profile picture to go along with each message 
function makepic() {    
  var picture;
  var x = Math.floor((Math.random() * 2) + 1);
  if(x === 1)
  {
    //console.log("here"); //doesn't even work here.
    picture = "http://d28gj8nawx6f1h.cloudfront.net/images/vendor/default-profile.png";
  }
  else
  {
    //console.log("There");
    picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6C2rI3sgRreCuirucLQyAjQrBBLb3rzRxS0zBYQY1A1cwsh0VQ";
  }
  return picture;
}
  

