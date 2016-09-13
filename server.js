var express = require('express'),
    Yelp = require('yelp'),
    Dodge = require("dodge"),
    app = express();

app.use(express.static(__dirname + '/public'));

var yelpData = new Yelp({
    consumer_key: 'hyIQVkkGLREDsZobyPp5dQ',
    consumer_secret: 'UgKdpO46BHlEOT-3K3MIPilF-Ro',
    token: 'PCPmAjNSEpcZ4T7TFaQ3VKj8-nhhRhWJ',
    token_secret: 'uF-cSlKj9usvzCIjSeVzwR2OcS8'
});

function getData(options, callBack) {

    yelpData.search({term: options.term, location: options.location})
        .then(function (data) {
            callBack(null, data);
        })
        .catch(function (error) {
            callBack(error);
        });
}

app.get('/search', function (request, response) {
    var paramater = request.query;
    getData(paramater, function (err, data) {
        if (err) {
            response.send({error: true});
        } else {
            response.send(data);
        }
    });
});

app.listen(3131);
console.log('Running Server......3131');