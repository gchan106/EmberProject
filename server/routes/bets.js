var express = require('express');
var app = express();

app.get('/requestalldata', function(req, res) {
    req.app.get('locals.client').db('bettDb').collection('indivBet').
        find().
        toArray((err,indivBet)=>{ res.json(indivBet);})
});

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

        req.app.get('locals.client').db('bettDb').collection('indivBet').
        update({ betID: betNum},
                  { $set: {'betData': queryData},}, (err, data) => {
                    if(data)
                        {res.json('data updated');} 
                    else 
                        {res.json('data not updated');}
                }) 
   
});

app.get('/deleteBet', function(req, res) {

    let betID = req.query.betID;
    let query = {"betID": betID};
    req.app.get('locals.client').db('bettDb').collection('indivBet').deleteOne(query)

});


module.exports = app;
