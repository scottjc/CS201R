var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

router.get('/comments', function(req, res, next) {
  Comment.find(function(err, comments){
    if(err){ return next(err); }
    res.json(comments);
  });
});


router.post('/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment){
    if(err){ return next(err); }
    res.json(comment);
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);
  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error("can't find comment")); }
    req.comment = comment;
    return next();
  });
});

router.get('/comments/:comment', function(req, res) {//for getting a single function
  res.json(req.comment);
});

router.put('/comments/:comment/upvote', function(req, res, next) {
  console.log("Still here!");	
  //console.log(req.comment);
  req.comment.upvote(function(err, comment){
    if (err) { return next(err); }
    res.json(comment);
  });
});

router.delete('/comments/:comment/delete', function(req, res, next) {//id where there is a /:
  console.log("inside the router delete");
  var comment = new Comment(req.body);
  req.comment.delete(function(err, comment){
      if(err){return next(err);}
      console.log("return");
      return res.sendStatus(200);
  });
});

module.exports = router;
