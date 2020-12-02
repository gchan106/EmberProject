const { json } = require('express');
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

    userAccountsCollection = db.collection('userAccounts');
    app.get('/users', function(req, res) {
        let user = req.query.username;
        let query = {username: user};
        userAccountsCollection.find(query).toArray((err, users) => {
            res.json(users);
        }); 
    });


 
    indivBetCollection = db.collection('indivBet')
    app.get('/apartOfBets', function(req, res) {
        let userCookie = req.query.userCookie;
        let tempArray = [];
        let query = {"betData.betParticipants.userID": userCookie};

        indivBetCollection.find(query).toArray((err, items) => {
            for(let i = 0; i < items.length; i++){

                if(items[i].betData.betParticipants[0].userID != userCookie){
                    tempArray.push(items[i])
                }
            }
            res.json(tempArray);
        });
    });
    app.get('/getUsersBets', function(req, res) {

        let userCookie = req.query.userCookie;
        let tempArray = [];
        let query = {"betData.betParticipants.userID": userCookie};
        indivBetCollection.find(query).toArray((err, items) => {
            for(let i = 0; i < items.length; i++){
                if(items[i].betData.betParticipants[0].userID == userCookie){
                    tempArray.push(items[i])
                }
            }
            res.json(tempArray);
        });
    });
});


module.exports = app;