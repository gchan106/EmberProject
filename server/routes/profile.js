var express = require('express');
var app = express();

const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return
    }

    app.get('/', function(req, res) {
        res.json("Test Profile");
    });


    const db = client.db('bettDb');


    //get user info
    userAccountsCollection = db.collection('userAccounts');
    app.get('/users', function(req, res) {
        let user = req.query.username;
        let query = {username: user};

        userAccountsCollection.find(query).toArray((err, users) => {
            res.json(users);
        }); 
    });


    //get user bet info
    userBetsCollection = db.collection('userBets');
    app.get('/apartOfBets', function(req, res) {
        let username = req.query.username;
        let query = {BetCreator: username};

        userBetsCollection.find(query).toArray((err, items) => {
            res.json(items);
    });
});


});


module.exports = app;