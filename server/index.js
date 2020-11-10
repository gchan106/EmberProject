const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

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