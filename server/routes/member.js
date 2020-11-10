var express = require('express');
var app = express();

app.get('/', function(req, res) {
    const id = req.query.userCookie;
    // if user is logged in, return data, otherwise return {data: null}
    res.json({
        data: {
            type: "member",
            id: id,
            attributes: {
                name: "ben",
                age: 4
            },
        }
        });
});
app.post('/', function(req, res) {
    
    // get username, password and add to DB
})

module.exports = app;