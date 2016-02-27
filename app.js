var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./db');

var routes = require('./routes/index');
var music = require('./routes/music');
var video = require('./routes/video');
var learninstrument = require('./routes/learninstrument');
var learnasong = require('./routes/learnasong');

var app = express();


// --------------mongo db -----------------



var MongoClient = require('mongodb').MongoClient;
var URL = 'mongodb://localhost:27017/mydatabase';

// MongoClient.connect( URL , function(err) {
//   if (err) {
//     console.log('Unable to connect to Mongo.');
//     process.exit(1);
//   } else {
//     app.listen(3000, function() {
//       console.log('Listening on port 3000...');
//     });
//   }
// });




MongoClient.connect(URL, function(err, db) {
  if (err) {
    console.log('there is an error with mongodb connection, please check!')
    return}

  else {
    console.log('Connected and Running Mongo Db...');
    var collection = db.collection('foods');

    // collection.insert({name: 'taco', tasty: true}, function(err, result) {
    //   collection.find({name: 'taco'}).toArray(function(err, docs) {
    //     console.log(docs[0]);
    //     db.close();
    //   });
    // });
  }
});

// setting up connection information with mongodb- synchronous call 
// var mongoclient = new MongoClient(new Server('localhost', 27017, {
//   'native_parser': true }));

// var db = mongoclient.db('course');
// app.get('/', function(req, res){
//   db.connection('Hello_mongo_express').findOne({}, function(err, doc){
//     res.render('Hello, doc')
//   })

// });


//-------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/video', video);
app.use('/music', music);
app.use('/learninstrument', learninstrument);
app.use('/learnasong', learnasong);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// mongoose.connect('mongodb://55.55.55.5/demo');




// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });

}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
