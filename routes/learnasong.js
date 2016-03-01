var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.createConnection('mongodb://localhost/mydatabase/learnasongs');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  var learnasongSchema = new mongoose.Schema({
    video: String
  });

  // Compile a 'Video' model using the videoSchema as the structure.
  // Mongoose also creates a MongoDB collection called 'Videos' for these documents.
  var Learnasong = mongoose.model('Learnasong', learnasongSchema);
  router.get('/', function(req, res, next) {
    mongoose.model('Learnasong').find(function(err, videos){
      res.render('learnasong', { title: 'MYMusic',
        className: 'video',
        videos: videos
      });
      console.log('videos: ', videos);
    });
  });

  router.post('/', function(req, res){
    var newvideo = res.req.body.title;
    console.log('response :', newvideo);
    var thor = new Learnasong({
      video: newvideo
    });
    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });
  });

  router.delete('/', function(req, res){
    var removevideo = res.req.body.video;
    console.log('response from router.delete-video :', removevideo);
    mongoose.model('Learnasong').remove({"video": removevideo }, function(){
      console.log('item removed');
    });
  });


});

module.exports = router;
