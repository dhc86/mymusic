var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.createConnection('mongodb://localhost/mydatabase/learninstruments');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  var learninstrumentSchema = new mongoose.Schema({
    video: String
  });

  // Compile a 'Video' model using the videoSchema as the structure.
  // Mongoose also creates a MongoDB collection called 'Videos' for these documents.
  var Learninstrument = mongoose.model('Learninstrument', learninstrumentSchema);
  router.get('/', function(req, res, next) {
    mongoose.model('Learninstrument').find(function(err, videos){
      res.render('learninstrument', { title: 'MYMusic',
        className: 'learninstrument',
        videos: videos
      });
      console.log('show (get) videos: ', videos);
    });
  });

  router.post('/', function(req, res){
    var newvideo = res.req.body.title;
    console.log('response in router.post - learninstrument:', newvideo);
    var thor = new Learninstrument({
      video: newvideo
    });
    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });
  });

});


module.exports = router;
