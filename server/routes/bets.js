var express = require('express');
var app = express();

app.get('/requestdata', function(req, res) {
    var betNum = req.query.betID; 

    req.app.get('locals.client').db('bettDb').collection('indivBet').
        find({betID: betNum}).
        toArray((err,indivBet)=>{ res.json(indivBet);})
});

app.get('/requestuserdata', function(req, res) {
    var userID = parseInt(req.query.userIdNum);

    req.app.get('locals.client').db('bettDb').collection('userAccounts').
        find({cookie: userID}).
        toArray((err,userData)=>{res.json(userData);})
});

app.get('/updatebetresolution', function(req, res) {
    var betNum = req.query.betID;
    var betNum = '001';  

    req.app.get('locals.client').db('bettDb').collection('indivBet').
        update({ betID : betNum }, { $set: { "betData.betResolution" : true } }, (err, data) => {
            if(data)
                {res.json('Bet resolution entered');} 
            else 
                {res.json('Bet resolution not updated');}
        })
});
app.get('/createdata', function(req, res) {
    var queryData = req.query.betData;
    var betID = req.query.betID; 

    req.app.get('locals.client').db('bettDb').collection('indivBet').
        insertOne({
            betID: betID,
            betData: queryData}, 

        (err, data) => {
            if(data) 
                {res.json(true);} 
            else 
                {res.json(null);}
        })
});
app.get('/updatedata', function(req, res) {
    var queryData = req.query.betData;
    var betNum = req.query.betID;
    //var betNum = '001';  

        req.app.get('locals.client').db('bettDb').collection('indivBet').
        update({ betID: betNum},
                  { $set: {'betData': queryData},}, (err, data) => {
                    if(data)
                        {res.json('data updated');} 
                    else 
                        {res.json('data not updated');}
                })
   
});
<<<<<<< HEAD


<<<<<<< HEAD
module.exports = app;
=======
<<<<<<< HEAD
module.exports = app;
=======

=======
>>>>>>> 8ec863e2... Update
module.exports = app;
<<<<<<< HEAD
>>>>>>> 2fd9c9f4... Update bets.js
<<<<<<< HEAD
>>>>>>> d94407c0... Update bets.js
=======
=======
>>>>>>> 292ea877... Update bets.js
>>>>>>> 8ec863e2... Update
