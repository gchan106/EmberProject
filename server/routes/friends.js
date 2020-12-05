var express = require('express');
var app = express();


app.get('/friendlist', function(req, res) {
    // given the username of the current logged in member, get his friend list
    //req.query.username
    req.app.get('locals.client').db('bettDb').collection('userFriends').find({username: req.query.username}).toArray((err , items) => {
      res.json(items[0]);
      //console.log(req.query.username)
    })
})
app.get('/addfriend', function(req, res) {
  console.log(req.query.usernameRequest)
  console.log(req.query.usernameReceiver)

  //if there is no entry in userFriends table for the account, make one (upsert)
  //work on this after
  req.app.get('locals.client').db('bettDb').collection('userFriends').findOne( {username: req.query.usernameRequester}, (err, foundEntry) => {
    console.log("should be null since theres no entry", foundEntry)
    if(!foundEntry)
    {
      req.app.get('locals.client').db('bettDb').collection('userFriends').
        insertOne({
            username: req.query.usernameRequest,
            friendsWith: []},)
    }
  })


  // using username or unique ID of a friend, add it to username using mongo
  req.app.get('locals.client').db('bettDb').collection('userAccounts').findOne( {username: req.query.usernameReceiver}, (err, foundProfile) => {
    console.log(foundProfile)
    let hasAddedFriend = false
    
    if(foundProfile)
    {
      req.app.get('locals.client').db('bettDb').collection('userFriends').updateOne(
        {username: req.query.usernameRequest},

        
        {$push: {"friendsWith": foundProfile}},

     ) 
      
      hasAddedFriend = true
    }
    
    res.json(hasAddedFriend);
    //console.log(req.query.username)
  })

});
app.get('/deletefriend', function(req, res) {
  let username = req.query.username;
  let name = req.query.name;
  let friendsList = [];


  req.app.get('locals.client').db('bettDb').collection('userFriends').find().toArray((err,friendList)=>{
    friendsList = friendList;
  })
  //update the db
});

module.exports = app;