var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.json("Test Bets");
});

module.exports = app;