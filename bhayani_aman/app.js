var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/a945945', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', function() {
  console.log('Error connecting to mongodb....');
  process.exit(1);
});

db.once('open', function() {
  console.log('Opened mongodb connection....');
});


process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Closing the mongodb connection');
  });
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


module.exports = app;