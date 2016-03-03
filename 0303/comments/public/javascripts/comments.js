
$(document).ready(function(){
    $("#serialize").click(function(){//grab the name and comment out of form and put into div
        var myobj = {Name:$("#Name").val(),Comment:$("#Comment").val()};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
    });
});