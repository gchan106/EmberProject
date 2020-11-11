var express = require('express');
var app = express();


app.get('/friendlist', function(req, res) {
    // given the username of the current logged in member, get his friend list
});
app.get('/addfriend', function(req, res) {
  // using username or unique ID of a friend, add it to username using mongo
});

module.exports = app;