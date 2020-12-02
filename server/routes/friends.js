var express = require('express');
var app = express();


app.get('/friendlist', function(req, res) {
    // given the username of the current logged in member, get his friend list
    //req.query.username
    req.app.get('locals.client').db('bettDb').collection('userFriends').find().toArray((err, items) => {
      res.json(items);
      //console.log(req.query.username)
    })
})
app.get('/addfriend', function(req, res) {
  // using username or unique ID of a friend, add it to username using mongo
  req.app.get('locals.client').db('bettDb').collection('userAccounts').find(req.query.usernameReceiver).toArray((err, foundProfile) => {
    let hasAddedFriend = false
    
    if(foundProfile)
    {
      req.app.get('locals.client').db('bettDb').collection('userFriends').updateOne(
        {username: req.query.usernameRequest},

        //apparently in the db right now, the friendsWith param is a string right now, I think it should be an array.
        {$push: {"friendsWith": req.query.usernameReceiver}}

      )

      hasAddedFriend = true
    }
    
    res.json(hasAddedFriend);
    //console.log(req.query.username)
  })

});

module.exports = app;