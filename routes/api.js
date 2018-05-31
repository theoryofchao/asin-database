var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');

/* GET home page. */
router.post('/asin', function(req, res, next) {
  let asin_url = req.body.asin_url;

  //check if already loaded into database?

  const token = 'HQfTDQ5Cun8TSUrsxgLevg';

  let options = {
    method: 'GET',
    uri: `https://api.proxycrawl.com/?token=${token}&url=${encodeURIComponent(asin_url)}`,
    transform: (body) => {
      return cheerio.load(body);  //When promise resolves, transforms function by loading into cheerio (for parsing)
    }
  }

  rp(options)
  .then(($) => {

    // category as array
    let productCategory = $('#wayfinding-breadcrumbs_feature_div ul').text();
    productCategory = cleanArray(productCategory.split(/[\r\n]+/), (toClean) => {
      if(toClean.length <= 1 || toClean === '›') {
        return null;
      } else {
        return toClean;
      }
    });

    // console.log(productCategory);

    let detailBullet = $('#detail-bullets .bucket .content ul').text();
    detailBullet = cleanArray(detailBullet.split(/[\r\n]+/));
    // console.log(detailBullet);

    let productDimensions = findParameters(detailBullet, "product dimensions");

    console.log(productDimensions);

    console.log("---------------------");

    let productTitle = $('#productTitle').text().trim()
    console.log(productTitle);

    console.log("---------------------");

    let productImage = $('#imgTagWrapperId').html()

    console.log(productImage);



    let salesRank = $('#SalesRank').text(); //TODO: take salesRank and separate into rank and category?

    res.setHeader('Content-Type', 'application/json');
    res.json({
      "productTitle": productTitle,
      "productImage": productImage,
      "productCategory": JSON.stringify(productCategory),
      "productDimensions": productDimensions,
      "salesRank": salesRank

    });
    return;
  })
  .catch((err) => {
    console.log("error request failed");
  });

  // return res.send(req.body);
  // res.render('index', { title: 'Express' });
});

function cleanArray(actual, customClean) {
  var newArray = [];

  actual.forEach((element) => {
    let cleaned = element.trim();
    cleaned = customClean ? customClean(cleaned) : cleaned;

    if(cleaned) {
      
      newArray.push(cleaned);
    }
  });
  return newArray;
}

let findParameters = (array, keyword) => {
  for(let i = 0; i < array.length; i++) {
    if(array[i].match(new RegExp(keyword, "i"))) {
      let description = array[i].split(":")[1].trim();
      if(description) {
        return description;
      } else {
        return array[i+1].trim();
      }
    }
  }
};

module.exports = router;
