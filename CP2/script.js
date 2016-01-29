$(document).ready(function() {
  console.log("ready");
  
  var url = "https://api.github.com/users/scottjc";
  
  $.ajax({
    url: url,
    success: function(data) {
    	console.log("success!!");
      $("#myid").html("<img src=" + data.avatar_url + "><br>" + "<strong>ID=" + data.id + "<br>Name: " + data.name + "</strong>");
    }
  });
});

function goTo()
{
	  console.log("They typed in " + link_id);
    //location.href = document.getElementById('link_id').value;
}