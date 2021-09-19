var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
var app = express();
const {connectDb} = require('./config/db.config');
const authRoutes = require('./routes/auth.routes');
const todoRoutes = require('./routes/todo.routes');
const {authMiddle} = require('./middleware/auth.middleware') ;

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//routing
app.use('/auth',authRoutes);
app.use('/todo', authMiddle , todoRoutes);

// connect to database
connectDb();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
