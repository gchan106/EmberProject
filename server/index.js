const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

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

    app.set('locals.client',  client);
    client.db('bettDb').dropDatabase();
  const db = client.db('bettDb');

  simpleTestCollection = db.collection('test');
  simpleTestCollection.insertOne({password: 'p', username: 'ben', age:4, isLoggedIn:'true', cookie: TEMPORARY_DEMO_COOKIE_1})
  simpleTestCollection.insertOne({password: 'p', username: 'alex', age:22, isLoggedIn:'false', cookie: TEMPORARY_DEMO_COOKIE_2})

app.get('/testing', function(req, res) {
    req.app.get('locals.client').db('bettDb').collection('test').find().toArray((err, items) => {
        res.json(items);
      })
    
    });


//Routers for coinsiding requests
//Add if I missed yours
var homeRouter = require('./routes/home');
var signupRouter = require('./routes/signup');
var memberRouter = require('./routes/member');
var authRouter = require('./routes/auth');
var betsRouter = require('./routes/bets');
var profileRouter = require('./routes/profile');

app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/members', memberRouter);
app.use('/auth', authRouter);
app.use('/bets', betsRouter);
app.use('/profile', profileRouter);

app.listen('4500');

module.exports = app;
})
