const jwt = require('jsonwebtoken');
var express = require('express');
var ejs = require('ejs');
let url = require('url');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var app = express();
var fs = require('fs');
var path=require("path");
var {secret} = require('./routes/util')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('.html',ejs.__express);
app.set('view engine','html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('*',function(req,res,next){
  const token = req.headers['authorization']
  const url = req.baseUrl;
  if(token&&(url=="/addCart"||url.indexOf('deleteCart')>-1)){
    jwt.verify(token, secret, function(err, decoded){
      if(err) {
        res.send({
          code: 401,
          message: '请登录'
        })
        throw err
      }
      next()
    }) 
  }else{
    next()
  }
})

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('err',err)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html',{a:1});
});
module.exports = app;
