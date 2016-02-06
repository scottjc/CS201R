angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective);

function mainCtrl ($scope) {

  $scope.users = [
    {name:"Jim",avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCXoMMPbTTa5iTyXQiWJ7zwi3icgNxSrMiOmcwwa58ZS3upGmO"}];

  $scope.addNew = function (user) {
    $scope.users.push({ 
      name: user.name,
      avatarUrl: user.url
    }); 
    
    user.name = '';
    user.url = '';
    
      var x = Math.floor((Math.random() * 2) + 1);
     if(x === 1)
     {
    document.body.style.backgroundColor = "green";
       
document.getElementById("h2").style.color = "yellow";
       document.getElementById("h3").style.color = "yellow";
       
     }
     else
     {
         document.body.style.backgroundColor = "blue";
       
       document.getElementById("h2").style.color = "red";
       document.getElementById("h3").style.color = "red";
     }
  };
}

function avatarDirective () {
  return {
    scope: {
      user: '=' 
    },
    restrict: 'E',
    template: (
      '<div class="Avatar">' +
      '<h4>{{user.name}}</h4>' +
      '<img ng-src="{{user.avatarUrl}}" />' +
      '</div>'
    ), 
    link: link
  };
  
  
  function link (scope) {
    if (!scope.user.avatarUrl) {
      
      var picture;
      var x = Math.floor((Math.random() * 2) + 1);
      if(x === 1)
        {
           console.log("here");
           scope.user.avatarUrl = "http://d28gj8nawx6f1h.cloudfront.net/images/vendor/default-profile.png";
        }
      else
        {
          console.log("There");
          scope.user.avatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6C2rI3sgRreCuirucLQyAjQrBBLb3rzRxS0zBYQY1A1cwsh0VQ";
        }
    }
  }
}