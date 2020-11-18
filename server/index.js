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
const url = 'mongodb://localhost:27017';
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return
    }
    app.set('locals.client', client);
    client.db('bettDb').dropDatabase();
    const db = client.db('bettDb');
    simpleTestCollection = db.collection('test');
    const db1 = client.db('bettDb');
    userAccountsCollection = db1.collection('userAccounts');
    const db2 = client.db('bettDb');
    friendsCollection = db2.collection('userFriends');
    const db3 = client.db('bettDb');
    activeBetsCollection = db3.collection('activeBets');
    const db4 = client.db('bettDb');
    userBetsCollection = db4.collection('userBets');

    simpleTestCollection.insertOne({
        name: 'ben',
        age: 56
    }, (err, result) => {})
    userAccountsCollection.insertOne({
        username: 'daniel',
        password: '12345',
        userBalance: 100,
        //userMadeBets []
        //userBetsAsParticipant []
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
    friendsCollection.insertOne({
        username: 'daniel',
        friendsWith: 'jasper'
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