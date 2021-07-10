const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

const cors = require('cors');
app.use(cors());
const TEMPORARY_DEMO_COOKIE_1 = 123123123;
const TEMPORARY_DEMO_COOKIE_2 = 123;


const mongo = require('mongodb').MongoClient
const url = 'mongodb+srv://gchanillustration:dragon3822@cluster0.axbhx.mongodb.net/bettDB?retryWrites=true&w=majority';
//const url = 'mongodb://localhost:27017';

//const { MongoClient } = require('mongodb');
//const uri = "mongodb+srv://gchanillustration:csc511@cluster0.axbhx.mongodb.net/betDB?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//client.connect(err => {
  //const collection = client.db("test").collection("devices");
  // perform actions on the collection object
//  client.close();
//});

mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    console.log('Successful Connection to Mongo in index.js');
    app.set('locals.client', client);
    const db = client.db();

    const indivBetCollection = db.collection('indivBet');
    indivBetCollection.insertOne({

        betID: '001',
        betData: {             
            betTitle: 'DRicks Bet',
            betAmount: 20,
            betAdmin: 'Rick',
            isAdmin: true, 
            betResolution: false,
            displayCreateBet: false,
            betDetail: 'Jerry will fail to impress Rick',
            betParticipants:[
                {userID:'101',userData:{userName: 'Rick', userTime: '1:00', betSide: false, }},
                {userID:'102',userData:{userName: 'Rick', userTime: '1:00', betSide: false, }}
            ],

        }
    })
    app.locals.db = db;
    console.log(app.locals.db);
    //client.db('bettDb').dropDatabase();
    //const db = client.db('bettDb');
    //simpleTestCollection = db.collection('test');
    //const db1 = client.db('bettDb');
    //userAccountsCollection = db1.collection('userAccounts');
    //const db2 = client.db('bettDb');
    //friendsCollection = db2.collection('userFriends');
    //const db3 = client.db('bettDb');
    //activeBetsCollection = db3.collection('activeBets');
    //const db4 = client.db('bettDb');
    //userBetsCollection = db4.collection('userBets');
    //const db5 = client.db('bettDb');
    //indivBetCollection = db5.collection('indivBet');
/** 
    indivBetCollection.insertOne({

        betID: '001',
        betData: {             
            betTitle: 'Ricks Bet',
            betAmount: 20,
            betAdmin: 'Rick',
            isAdmin: true, 
            betResolution: false,
            displayCreateBet: false,
            betDetail: 'Jerry will fail to impress Rick',
            betParticipants:[
                {userID:'101',userData:{userName: 'Rick', userTime: '1:00', betSide: false, }},
                {userID:'102',userData:{userName: 'Rick', userTime: '1:00', betSide: false, }}
            ],

        }
    })
    indivBetCollection.insertOne({

        betID: '002',
        betData: {             
            betTitle: 'Jerry wont Fail',
            betAmount: 20,
            betAdmin: 'Beth',
            isAdmin: true, 
            betResolution: false,
            displayCreateBet: false,
            betDetail: 'Jerry will fail to impress Rick',
            betParticipants:[
                {userID:'101',userData:{userName: 'Rick', userTime: '1:00', betSide: false, }},
                {userID:'102',userData:{userName: 'Summer', userTime: '1:00', betSide: false, }}
            ],

        }
    })
    indivBetCollection.insertOne({

        betID: '003',
        betData: {             
            betTitle: 'Morty outsmarts Jerry',
            betAmount: 20,
            betAdmin: 'Rick',
            isAdmin: true, 
            betResolution: false,
            displayCreateBet: false,
            betDetail: 'Morty is smart enough to realize Jerry has no pants',
            betParticipants:[
                {userID:'101',userData:{userName: 'Summer', userTime: '1:00', betSide: false, }},
                {userID:'102',userData:{userName: 'Jerry', userTime: '1:00', betSide: false, }}
            ],

        }
    })
    

    simpleTestCollection.insertOne({
        name: 'ben',
        age: 56
    }, (err, result) => {})
    userAccountsCollection.insertOne({
        username: 'daniel',
        password: '12345',
        userBalance: 100,
        isLoggedIn: 'true',
        cookie: TEMPORARY_DEMO_COOKIE_1
    })
    userAccountsCollection.insertOne({
        username: 'jasper',
        password: '222',
        userBalance: 100,
        isLoggedIn: 'true',
        cookie: TEMPORARY_DEMO_COOKIE_2
    })

    userAccountsCollection.insertOne({
        username: 'Victoria',
        password: '232',
        userBalance: 100,
        isLoggedIn: 'true',
        cookie: 11111
    })

    friendsCollection.insertOne({
        username: 'daniel',
        friendsWith: [
            {username: 'jasper'}
        ]
    }, (err, result) => {})
    activeBetsCollection.insertOne({
        BetCreator: 'daniel',
        BetDescription: 'Buffalo Bills will win the superbowl',
        BetAmount: 20,
        BetPayout: 100,
        BetStatus: 'TBD',
        userAccountsID: ''
    }, (err, result) => {})
    userBetsCollection.insertOne({
        BetCreator: 'daniel',
        BetDescription: 'Buffalo Bills will win the superbowl',
        BetAmount: 20,
        BetPayout: 100,
        BetStatus: 'TBD',
        userAccountsID: ''
    }, (err, result) => {})
    app.get('/testing', function(req, res) {
        simpleTestCollection.find().toArray((err, items) => {
            res.json(items);
        })
    });
    */
    app.get('/test', function(req, res) {
 res.json(req.query.username)
});
    app.get('/user', function(req, res) {
        req.app.get('locals.client').db('bettDb').collection('userAccounts').find().toArray((err, items) => {
            res.json(items);
        })
    });
    app.get('/friends', function(req, res) {
        req.app.get('locals.client').db('bettDb').collection('userFriends').find().toArray((err, items) => {
            res.json(items);
        })
    });
    app.get('/activeBets', function(req, res) {
        req.app.get('locals.client').db('bettDb').collection('activeBets').find().toArray((err, items) => {
            res.json(items);
        })
    });
    app.get('/userBets', function(req, res) {
        req.app.get('locals.client').db('bettDb').collection('userBets').find().toArray((err, items) => {
            res.json(items);
        })
    });
})



//Routers for coinsiding requests
//Add if I missed yours
var homeRouter = require('./routes/home');
var signupRouter = require('./routes/signup');
var friendsRouter = require('./routes/friends');
var authRouter = require('./routes/auth');
// var memberRouter = require('./routes/member');
var betsRouter = require('./routes/bets');
var profileRouter = require('./routes/profile');
app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/friends', friendsRouter);
app.use('/auth', authRouter);
// app.use('/members', memberRouter);
app.use('/bets', betsRouter);
app.use('/profile', profileRouter);
app.listen('4500');
module.exports = app;