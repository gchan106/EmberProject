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
    //var betNum = '001';  

    req.app.get('locals.client').db('bettDb').collection('indivBet').// so this updates but we need to update false using string but not finding it so FIX itS
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
//indivBetCollection = db.collection('indivBet')
app.get('/deleteBet', function(req, res) {
    //sorts userBets by username to get current user's created bets
    let betID = req.query.betID;
    let query = {"betID": betID};
    req.app.get('locals.client').db('bettDb').collection('indivBet').deleteOne(query)

    //indivBetCollection.deleteOne(query, function(err, obj) {
    //    if (err) throw err;
    //    console.log("bet deleted");
});


module.exports = app;
