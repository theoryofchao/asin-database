var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/asin', function(req, res, next) {
  console.log(req.body.asin);
  
  return res.send(req.body);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
