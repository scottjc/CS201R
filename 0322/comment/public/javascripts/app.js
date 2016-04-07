angular.module('comment', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.test = 'Hello world!';
    $scope.comments = [
      {title:'Comment 1', upvotes:5},
      {title:'Comment 2', upvotes:6},
      {title:'Comment 3', upvotes:1},
      {title:'Comment 4', upvotes:4},
      {title:'Comment 5', upvotes:3}
    ];
    $scope.create = function(comment) {
      return $http.post('/comments', comment).success(function(data){
        $scope.comments.push(data);
      });
    };
	$scope.addComment = function() {
	  $scope.create({title:$scope.formContent,upvotes:0,picture:$scope.formContent2});
      $scope.formContent='';
      $scope.formContent2='';
    };
    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    };


  $scope.delete = function(comment) {
      return $http.delete('/comments/' + comment._id + '/delete').success(function(data){
      console.log("inside scope delete!");  
      var index = $scope.comments.indexOf(comment);
      if(index > -1)
      {
        $scope.comments.splice(index, 1);
      }
    });
  };


    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      });
    };
    $scope.getAll();

  }
]);