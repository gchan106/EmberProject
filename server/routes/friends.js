var express = require('express');
var app = express();


app.get('/friendlist', function(req, res) {
  // given the username of the current logged in member, get his friend list
  //req.query.username
  req.app.get('locals.client').db('bettDb').collection('userFriends').find({username: req.query.username}).toArray((err , items) => {
    res.json(items[0]);
    //console.log(req.query.username)
  })
});

app.get('/addfriend', function(req, res) {
  let hasAddedFriend = false;

  //see if current user exists in userFriends table, if not then insert such current user into userFriends table
  req.app.get('locals.client').db('bettDb').collection('userFriends').findOne({username: req.query.usernameRequest}, (err, currentUser) => {
    if(!currentUser){
      req.app.get('locals.client').db('bettDb').collection('userFriends').insertOne({username: req.query.usernameRequest, friendsWith: []})
    }

    //push friend to current's user instance
    let object = {username: req.query.usernameReceiver}
    req.app.get('locals.client').db('bettDb').collection('userFriends').updateOne(
      {username: req.query.usernameRequest}, 
      { $push: { friendsWith: { $each: [object], $sort: 1 }}}
    )
  })
  hasAddedFriend = true;
  res.json(hasAddedFriend);
});

app.get('/deletefriend', function(req, res) {
  let username = req.query.username;
  let name = req.query.name;
  let friendsList = [];

  req.app.get('locals.client').db('bettDb').collection('userFriends').find({username: username}).toArray((err,friendList)=>{
    //get friends with from DB
    friendsList = friendList[0].friendsWith;

    //make a new array that will hold friends we want to keep
    let tempArray = [];
    for(let i = 0; i < friendsList.length; i++){
        if(friendsList[i].username != name){
          tempArray.push(friendsList[i]);
        }
    }

    //update the db
    req.app.get('locals.client').db('bettDb').collection('userFriends').updateOne({username: username}, {$set: {friendsWith: tempArray}});

    res.json(tempArray);
  });
});

module.exports = app;