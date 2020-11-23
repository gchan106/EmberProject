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

app.post('/login', function(req, res) {
    const username = req.param('username').toLowerCase();
    const password = req.param('password').toLowerCase();
    req.app.get('locals.client').db('bettDb').collection('userAccounts').findOne({
        username,password
    }, (err, items) => {
        console.log(err, items, "debug for class")

        if(items){
            req.app.get('locals.client').db('bettDb').collection('userAccounts')
            .updateOne(  { username:username,password:password } , { $set: { isLoggedIn : "true"  } }, (err, item) => {
                // console.log(items, 'response for logout')
                if(item){
                    res.json({...items,isLoggedIn:true});
                } else {
                    res.json(null);
                }
            })
        } else {
            res.json(null);

        }
      })
});


module.exports = app;