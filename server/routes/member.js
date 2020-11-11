var express = require('express');
var app = express();

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
  const db = client.db('bettDb');
  members = db.collection('members');
  members.insertOne({name: 'ben', age:56, cookie: FAKE_COOKIES}, (err, result) => {})
})

app.get('/', function(req, res) {
    const id = parseInt(req.query.userCookie);

    members.findOne({cookie: id}, (err, items) => {
        console.log(items, '')
        if(items){
            res.json(items);
        } else {
            res.json(id);

        }
      })
});


module.exports = app;