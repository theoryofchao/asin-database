var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const cheerio = require('cheerio');
const pgp = require('pg-promise')({});  //no init options
const cn = `postgres://asinuser:asinuser@localhost:5432/asin`;  //separate out database username and password to config file
const db = pgp(cn);

/* GET home page. */
router.post('/asin', function(req, res, next) {
  let asin_url = req.body.asin_url;

  const token = 'HQfTDQ5Cun8TSUrsxgLevg'; //move to it's own function
  let encoded_asin_url = encodeURIComponent(asin_url);

  // Check DB for URL
  db.any('SELECT * FROM asin WHERE url = $1', [asin_url])
  .then((data) => {
    // If URL does not exist in DB
    if(data.length === 0) {

      let options = {
        method: 'GET',
        uri: `https://api.proxycrawl.com/?token=${token}&url=${encoded_asin_url}`,
        transform: (body) => {
          return cheerio.load(body);  //When promise resolves, transforms function by loading into cheerio (for parsing)
        }
      }

      return rp(options)
      .then($ => {
        let pageText = $.text().split(/[\r\n]+/);

        //name (works)
        let productTitle = $('#productTitle').text().trim();

        //category (as array) (works)
        let productCategory = $('#wayfinding-breadcrumbs_feature_div ul').text();
        productCategory = cleanArray(productCategory.split(/[\r\n]+/), (toClean) => {
          if(toClean.length <= 1 || toClean === '›') {
            return null;
          } else {
            return toClean;
          }
        });

        //rank
        let salesRank = $('#SalesRank').text().split(/[\r\n]+/);
        salesRank = cleanArray(salesRank, (toClean) => {
          if(toClean.includes(`Sellers Rank`)) {
            return null;
          } else if (toClean.toLowerCase().includes(`(see top`)){
            return toClean.split("(See top")[0].split("(See Top")[0].trim();
          } else {
            return toClean;
          }
        });
        let temp = []

        salesRank.forEach((element, index, array) => {
          if(element.includes(`#`) && element.includes(`in`)) {
            temp.push(element);
          } else if(element.includes(`#`) && array[index+1]) {
              temp.push(`${element} ${array[index+1]}`)
          }
        });
        salesRank = temp.slice();

        //dimensions
        let productDimensions = pageText.find((element) => {
          return element.match(/.+\sx.+\sx.+/g);
        });
        productDimensions = productDimensions ? productDimensions.trim().split("imensions").pop().split("ize").pop() : "Product dimensions not found";

        // //image
        // let productImage = $('#imgTagWrapperId').html();
        // productImage = productImage.match(/data-old-hires=".+jpg\" onload"/g)[0].replace("data-old-hires\"","").replace("\" onload", "");
        // console.log(productImage);

        let productUrl = asin_url;

        return db.one(`INSERT INTO asin(name, category, rank, dimensions, image, url) VALUES ($1, $2, $3, $4, $5, $6) returning id`, [productTitle, productCategory.toString(), salesRank.join("|||"), productDimensions, 'imagetest', asin_url])
        .then(data => {
          return {
            id: data.id,
            name: productTitle,
            category: productCategory.toString(),
            rank: salesRank.join("|||"),
            dimensions: productDimensions,
            image: 'imagetest',
            url: productUrl
          }
        })
        .catch(error => {
          console.log(error);
        });
      });
    // If URL exists in DB
    } else {
      console.log(data[0])
      return data[0];
    }
  })
  .then(parsedResults => {
    res.setHeader('Content-Type', 'application/json');
    res.json({
      "productTitle": parsedResults.name,
      "productImage": parsedResults.image,
      "productCategory": parsedResults.category,
      "productDimensions": parsedResults.dimensions,
      "salesRank": parsedResults.rank

    });
  })
  .catch(error => {
    console.log(error)
    return;
  });
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
