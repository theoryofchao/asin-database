var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');

/* GET home page. */
router.post('/asin', function(req, res, next) {
  let asin_url = req.body.asin_url;

  const token = 'HQfTDQ5Cun8TSUrsxgLevg';

  let options = {
    method: 'POST',
    uri: `https://api.proxycrawl.com/?token=${token}&url=${encodeURIComponent(asin_url)}`,
    transform: (body) => {
      return cheerio.load(body);  //When promise resolves, transforms function by loading into cheerio (for parsing)
    }
  }

  rp(options)
  .then(($) => {
    let detailBullet = $('#detail-bullets .bucket .content ul').text();
    let detailBullet2 = detailBullet.split(/[\r\n]+/);

    console.log(detailBullet2);
    let salesRank = $('#SalesRank').html();

    return res.send(detailBullet);
  })
  .catch((err) => {
    console.log("error request failed");
  });

  // return res.send(req.body);
  // res.render('index', { title: 'Express' });
});

module.exports = router;
