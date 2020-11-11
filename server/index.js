const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
const FAKE_COOKIES = 123123123;


const mongo = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017';
mongo.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, client) => {
  if (err) {
    return
  }
  client.db('bettDb').dropDatabase();
  const db = client.db('bettDb');

  simpleTestCollection = db.collection('test');
  simpleTestCollection.insertOne({name: 'ben', age:56, cookie: FAKE_COOKIES}, (err, result) => {

})
app.get('/testing', function(req, res) {
    simpleTestCollection.find().toArray((err, items) => {
        res.json(items);
      })
    
    });
})

//Routers for coinsiding requests
//Add if I missed yours
var homeRouter = require('./routes/home');
var signupRouter = require('./routes/signup');
var memberRouter = require('./routes/member');
var betsRouter = require('./routes/bets');
var profileRouter = require('./routes/profile');

app.use('/', homeRouter);
app.use('/signup', signupRouter);
app.use('/members', memberRouter);
app.use('/bets', betsRouter);
app.use('/profile', profileRouter);

app.listen('4500');

module.exports = app;