$(document).ready(function(){
	//post upon clicking
    $("#serialize").click(function(){
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        console.log(jobj);

		var url = "comment";
		$.ajax({
		  	url:url,
		  	type: "POST",
			data: jobj,
			contentType: "application/json; charset=utf-8",
			success: function(data,textStatus) {
			   $("#done").html(textStatus);
			}
		})
    });

    //button for getting
    $("#getThem").click(function() {
    $.getJSON('comments', function(data) {
      console.log(data);
      var everything = "<ul>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li>Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  })
});