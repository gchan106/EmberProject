var express = require('express');
var app = express();


app.post('/login', function(req, res) {
    const username = req.param('username');
    const password = req.param('password');
    req.app.get('locals.client').db('bettDb').collection('test').findOne({
        username,password
    }, (err, items) => {
        console.log(err, items, "debug for class")

        if(items){
            res.json(items);
        } else {
            res.json(null);

        }
      })
});
app.get('/isloggedin', function(req, res) {
    const cookie = parseInt(req.query.cookie);
    console.log('checking if is logged in', cookie);
    req.app.get('locals.client').db('bettDb').collection('test').findOne({
        cookie
    }, (err, items) => {
        console.log(err, items, "debug for class")
        if(items && items.isLoggedIn){
            res.json(items);
        } else {
            res.json(null);

        }
      })
});
app.post('/logout', function(req, res) {
    const cookie = req.param('cookie');
    console.log(cookie, 'the cookie')
    req.app.get('locals.client').db('bettDb').collection('test').update(  { cookie } , { $set: { isLoggedIn : false  } }, (err, items) => {
        // console.log(items, 'response for logout')
        if(items){
            res.json(true);
        } else {
            res.json(null);

        }
      })
});

module.exports = app;