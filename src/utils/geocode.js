"use strict";
exports.__esModule = true;
exports.geocode = void 0;
var request = require("request");
var geocode = function (address, callback) {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/".concat(encodeURIComponent(address), ".json?access_token=pk.eyJ1IjoiYmFyamFjb2IiLCJhIjoiY2w4c20wdXcyMDdsaTNvc3loYzZhY2kyYyJ9.6ZTAOh1n935gw9V5yZFAew&limit=1");
    // destructing body from response.body
    request({ url: url, json: true }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Unable to connect to location services!', undefined);
        }
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined);
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};
exports.geocode = geocode;
