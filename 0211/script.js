
angular.module('News', [])
.factory('postFactory', [function(){
  var o = {
    posts: []
  };
  return o;
}])
.controller('MainCtrl', [
  '$scope',
  'postFactory',/*injecting a service*/
  function($scope, postFactory){
    $scope.posts = postFactory.posts;
    $scope.test = 'Hello world!';
    $scope.posts = [
      {title:'Post 1', upvotes:5},
      {title:'Post 2', upvotes:6},
      {title:'Post 3', upvotes:1},
      {title:'Post 4', upvotes:4},
      {title:'Post 5', upvotes:3}
    ];
      $scope.addPost = function() {
      $scope.posts.push({title:$scope.formContent,upvotes:0});
      $scope.formContent='';
    };
    $scope.incrementUpvotes = function(post) {
      post.upvotes += 1;
    };
    
  }
  
]);