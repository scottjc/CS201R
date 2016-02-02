$(document).ready(function() {
  console.log("ready");
  
  var url = "https://api.github.com/users/scottjc";
  
  $.ajax({
    url: url,
    success: function(data) {
    	console.log("success!!");
      $("#One").html("<img src=" + data.avatar_url + "><br>" + "<strong>ID=" + data.id + "<br>Name: " + data.name + "</strong>");
    }
  });
});