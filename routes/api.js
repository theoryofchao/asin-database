var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const {OperationHelper} = require('apac');

const config = require('../config.json');


/* GET home page. */
router.post('/asin', function(req, res, next) {
  // console.log(req.body.asin);

  console.log(config);

  const options = {
    uri: `http://www.amazon.com/dp/${req.body.asin}`,
    transform: (body) => {
      return cheerio.load(body);
    }
  }

  rp(options)
  .then((data) => {
    // console.log(data.html());
    // data('span.inlineBlock-display span.a-color-price').each((i, element) => {
    //   console.log(element);
    // })
    return res.send(data.html());
  })

  // return res.send(req.body);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
