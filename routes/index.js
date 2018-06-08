var express = require('express'),
    router = express.Router(),
    https = require('https');

router.get('/:countryId/states', function(req, res) {
  makeCall('https://api.mercadolibre.com/classified_locations/countries/' + req.params.countryId, 'states', function(data) {
    res.send(data);
  });
});

router.get('/:stateId/cities', function(req, res) {
    makeCall('https://api.mercadolibre.com/classified_locations/states/' + req.params.stateId, 'cities', function(data) {
        res.send(data);
    });
});

router.get('/:cityId/neighborhoods', function(req, res) {
    makeCall('https://api.mercadolibre.com/classified_locations/cities/' + req.params.cityId, 'neighborhoods', function(data) {
        res.send(data);
    });
});

function makeCall (url, field, callback) {
    https.get(url, function (res) {
        let body = [];
        res.on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function() {
            body = Buffer.concat(body).toString();
            callback(JSON.parse(body)[field]);
        });
    }).on('error', (e) => {
        callback("Something was wrong: " + e.toString())
    });
}

module.exports = router;
