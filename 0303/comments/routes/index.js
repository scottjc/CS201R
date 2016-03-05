
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); //Adds mongoose as a usable dependency
mongoose.connect('mongodb://localhost/commentDB'); //Connects to a mongo database called "commentDB"

var commentSchema = mongoose.Schema({ //Defines the Schema for this database
  Name: String,
  Comment: String
});
//connect to the comment model
var Comment = mongoose.model('Comment', commentSchema); //Makes an object from that schema as a model

var db = mongoose.connection; //Saves the connection as a variable to use
db.on('error', console.error.bind(console, 'connection error:')); //Checks for connection errors
db.once('open', function() { //Lets us know when we're connected
  console.log('Connected');
});

router.post('/comment', function(req, res, next) {
  console.log("POST comment route"); //[1]
  console.log("In the GET route");
  console.log(req.body); //[2]

  var newcomment = new Comment(req.body); //We're reading what we got and putting it into the db
  console.log(newcomment); //[3]
  newcomment.save(function(err, post) { //[4]
    if (err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

module.exports = router;


/* GET comments from database  READING*/
router.get('/comments', function(req, res, next) {
  console.log("In the GET route?");
  Comment.find(function(err,commentList) { //Calls the find() method on your database
    if (err) return console.error(err); //If there's an error, print it out
    else {
      console.log(commentList); //Otherwise console log the comments you found
      res.json(commentList); //Then send them
    }
  });
});