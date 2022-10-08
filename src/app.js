"use strict";
exports.__esModule = true;
var path = require("path");
var express = require("express");
var hbs = require("hbs");
var geocode_1 = require("./utils/geocode");
var forcast_1 = require("./utils/forcast");
var app = express();
// the first argument is the port heroku will provide us
var port = process.env.PORT || 3000;
/* Define paths for Express config */
var publicDirectoryPath = path.join(__dirname, '../public');
var viewsPath = path.join(__dirname, '../templates/views');
var partialsPath = path.join(__dirname, '../templates/partials');
/* Setup handlebars engine and views location */
// views is the default directory for express for using templates
// here we set views path, so we can change the dir name to be something else and not views
app.set('views', viewsPath);
// tells express which templating engine we installed 
app.set('view engine', 'hbs');
// takes path to the partials
hbs.registerPartials(partialsPath);
/* Setup static directory to serve */
// takes a path to the folder we want to serve, it's a way of adjusting our server, tells him who he serves(?)
app.use(express.static(publicDirectoryPath));
app.get('', function (req, res) {
    // allows us to render one of our views
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});
app.get('/help', function (req, res) {
    res.render('help', {
        helpText: 'some message',
        title: 'Help',
        name: 'Andrew Mead'
    });
});
app.get('/weather', function (req, res) {
    if (!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        });
    }
    (0, geocode_1.geocode)(req.query.address.toString(), function (error, data) {
        if (data === undefined) {
            return res.send({ error: error });
        }
        var latitude = data.latitude, longtitude = data.longtitude, location = data.location;
        (0, forcast_1.forcast)(latitude, longtitude, function (error, forcastData) {
            if (error) {
                return res.send({ error: error });
            }
            res.send({
                forcast: forcastData,
                location: location,
                address: req.query.address
            });
        });
    });
});
app.get('/products', function (req, res) {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }
    res.send({
        products: []
    });
});
// match anypage that hasn't been match so far but it starts with /help/!
app.get('/help/*', function (req, res) {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    });
});
// '*' this url means: match anything that hasn't been matched so far
// has to be at the end of get requests! because express goes from top to bottom and check matches by order
app.get('*', function (req, res) {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'
    });
});
// this will start up the server, and will call the callback function when its up
// whenever someone visit the root of our website, the server is up and running, listening for requests
app.listen(port, function () {
    console.log("Server is up on port ".concat(port));
});
// path to this file's directory
// console.log(__dirname)
// path to this file
// console.log(__filename)
// console.log(path.join(__dirname, '../public'));
// the first argument is the partial url (route)
// the second is the function that is called when someone visit this particular route
// in this example '' means home page
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>');
// })
// app.get('/help', (req, res) => {
//     // will detect that we passed an array/object, and it will automatically stringify it to JSON
//     res.send([{
//         name: 'Bar',
//         age: 24
//     }]);
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>');
// })
