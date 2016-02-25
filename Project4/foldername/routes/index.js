//make a request like http://ec2-52-10-93-201.us-west-2.compute.amazonaws.com:3000/getcity?q=Provo
var express = require('express');//kill %1 stops the npm start you did.
var fs = require('fs');//lets us read varous files
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root:  'public' });//or whatever your file name is in the public file

});

router.get('/getcity',function(req,res,next) {
            console.log("In getcity route");


            fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
            if(err) throw err;

            var cities = data.toString().split("\n");
            var myRe = new RegExp("^" + req.query.q);
            console.log(myRe);

            var jsonresult = [];
            for(var i = 0; i < cities.length; i++) {
              var result = cities[i].search(myRe);
          		if(result != -1) {
            	 console.log(cities[i]);//display to console
           		 jsonresult.push({city:cities[i]});//display to website
          		}
            }

            console.log(jsonresult);
            res.status(200).json(jsonresult);//display the results
    });
});



module.exports = router;
