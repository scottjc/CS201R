var mongoose = require('mongoose');
var CommentSchema = new mongoose.Schema({
  title: String,
  upvotes: {type: Number, default: 0},
  picture: String,
  power: String,
  artist: String,
  genre: String,
});

CommentSchema.methods.upvote = function(cb) {
  console.log("Were gonna upvote!");
  this.upvotes += 1;
  this.save(cb);
};

CommentSchema.methods.delete = function(cb){
  this.remove(cb);
};

mongoose.model('Comment', CommentSchema);
//jpeg into field put into field and $scope = .. picture in the db

//model. Add picture and url field. Change stuff in app.js