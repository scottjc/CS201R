var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/comment', function(req, res, next) {
  console.log("POST comment route"); //[1]
  res.sendStatus(200);
});

module.exports = router;
