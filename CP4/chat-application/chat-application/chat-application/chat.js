var socket = io();
function submitfunction(){
  var from = $('#user').val();
  var pic  = $('#userpic').val();//added a bunch of stuff
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
  var pic = $('#userpic').val();
  console.log(pic);
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  //display pic and message
  $('#messages').append('<li><img src="' + pic + '" style="height:20px;width:20px;"><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 });
 //$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 //});

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
  $('#userpic').val(pic);//display picture
  socket.emit('chatMessage', 'System', '<img src="' + pic + '" style="height:20px;width:20px;"><b>' + name + '</b> has joined the discussion');
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
    picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc517S36yMQnGg7Rwcu0CmwHLjMLdaBbNHZO2MQe8sbRb6qzfp";
    console.log(picture);
  }
  else
  {
    //console.log("There");
    picture = "http://tr3.cbsistatic.com/fly/351-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png";
    console.log(picture);
  }
  return picture;
}
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc517S36yMQnGg7Rwcu0CmwHLjMLdaBbNHZO2MQe8sbRb6qzfp orange
//http://tr3.cbsistatic.com/fly/351-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png blue  
//http://d28gj8nawx6f1h.cloudfront.net/images/vendor/default-profile.png pink
