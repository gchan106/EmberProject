var express = require('express');
var app = express();
 
app.post('/', function(req, res) {
    const username = req.param('username').toLowerCase();
    const password = req.param('password').toLowerCase();
    const cookie = Date.parse(new Date());

    req.app.get('locals.client').db('bettDb').collection('userAccounts').
    findOne({username,password}, (err, items) => {
        
        console.log(err, items, "debug for class")
        if(items){
            res.json(null);} 
        else {
            req.app.get('locals.client').db('bettDb').collection('userAccounts').
            insertOne({ 
                username:username,
                password:password,
                cookie:cookie 
            })
                res.json(true); 
        }
    })
});

module.exports = app;