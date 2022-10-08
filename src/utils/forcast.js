"use strict";
exports.__esModule = true;
exports.forcast = void 0;
var request = require("request");
var forcast = function (latitude, longtitude, callback) {
    var url = "http://api.weatherstack.com/current?access_key=9ba002ba4268b75e3bfaf5636e8daa9f&query=".concat(latitude, ",").concat(longtitude, "&units=m");
    // destructing body from response.body
    request({ url: url, json: true }, function (error, _a) {
        var body = _a.body;
        if (error) {
            callback('Unable to connect to weather services!', undefined);
        }
        else if (body.error) {
            callback('Unable to find location', undefined);
        }
        else {
            var currentProperty = body.current;
            callback(undefined, "".concat(currentProperty.weather_descriptions[0], ". It is currently ").concat(currentProperty.temperature, " degrees out. It feels like ").concat(currentProperty.feelslike, " degrees out."));
        }
    });
};
exports.forcast = forcast;
