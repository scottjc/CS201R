var socket = io();
function submitfunction(){
  var from = $('#user').val();
  var pic  = $('#userpic').val();//added a bunch of stuff
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message, pic);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() {
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg, userpic){
  var me = $('#user').val();
  var space = " ";
  console.log(userpic);
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  //display pic and message
  $('#messages').append('<li><img src="' + userpic + '" id = "circular">' + space + '<b style="color:' + color + '">' + from + '</b>: ' + space + msg + '</li>');
 });
 //$('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
 //});

socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 5000);
});

//After .ready, this changes the system tag to blue
socket.on('newmessage', function(user, joinedmessage){
  var color = '#009afd';
  
   $('#messages').append('<li><b style="color:' + color + '">' + user + '</b>: ' + joinedmessage + '</li>');
 });

//Displays right when you start. Build a string with System, picture, and joined message
$(document).ready(function(){
  var name = makeid();
  var space = " ";
  var pic = makepic();
  $('#user').val(name);
  $('#userpic').val(pic);//assign picture
  socket.emit('newmessage', 'System', '<img src="' + pic + '" id = "circular"><b>' + space + name + '</b> has joined the discussion');
  //alert("Hiya!");
});

//Generates a random username 
function makeid() {

  //turn off that checkbox
  function disable() {
     document.getElementById("check").disabled= true;
  }

  //Put up a text box asking for a username from the user.
  var person = prompt("Please enter a username:", "Harry Potter");  
  if (person == "" || person == null)
  {
  	person = "He who must not be named";
  }
  return person;      
}

//Generates a random profile picture to go along with each message 
function makepic() {    
  var picture;
  var x = Math.floor((Math.random() * 3) + 1);
  if(x === 1)
  {
    //console.log("here"); //doesn't even work here.
    picture = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc517S36yMQnGg7Rwcu0CmwHLjMLdaBbNHZO2MQe8sbRb6qzfp";
    console.log(picture);
  }
  else if(x === 2)
  {
    //console.log("There");
    picture = "http://tr3.cbsistatic.com/fly/351-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png";
    console.log(picture);
  }
  else
  {
    //console.log("no, here");
    picture = "http://d28gj8nawx6f1h.cloudfront.net/images/vendor/default-profile.png";
    console.log(picture);
  }
  return picture;
}
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc517S36yMQnGg7Rwcu0CmwHLjMLdaBbNHZO2MQe8sbRb6qzfp orange
//http://tr3.cbsistatic.com/fly/351-fly/bundles/techrepubliccore/images/icons/standard/icon-user-default.png blue  
//http://d28gj8nawx6f1h.cloudfront.net/images/vendor/default-profile.png pink
