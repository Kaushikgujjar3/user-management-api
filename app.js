var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const cors = require('cors');
const session = require('express-session');

// var usersRouter = require('./routes/users');
var GoogleRouter = require('./routes/googleroutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'ejs');
// app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(cors({
  origin: 'https://user-management-api-ok62.onrender.com/', 
  methods: 'GET,POST',
  credentials: true 
}));

app.use(session({
  secret: process.env.CLIENT_SECRET,
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { secure: true , httpOnly: true }
}));


// app.use('/', usersRouter);
app.use('/', GoogleRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handling middleware in app.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: err
  });
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
