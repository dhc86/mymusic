var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.createConnection('mongodb://localhost/mydatabase/videos');
// mongoose.connect('mongodb://diego.herrera:cq8bul7i@ds019698.mlab.com:19698/mymusic_database');
mongoose.connect('mongodb://:<dbpassword>@ds023438.mlab.com:23438/heroku_sl52l1bv');

// mongoose.createConnection('mongodb://diego.herrera:cq8bul7i@ds019698.mlab.com:19698/mymusic_database');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  var videoSchema = new mongoose.Schema({
    video: String
  });

  // Compile a 'Video' model using the videoSchema as the structure.
  // Mongoose also creates a MongoDB collection called 'Videos' for these documents.
  var Video = mongoose.model('Video', videoSchema);
  router.get('/', function(req, res, next) {
    mongoose.model('Video').find(function(err, videos){
      res.render('video', { title: 'MYMusic',
        className: 'video',
        videos: videos
      });
      console.log('videos: ', videos);
    });
  });

  router.post('/', function(req, res){
    var newvideo = res.req.body.title;
    console.log('response from router.post-video :', newvideo);
    var thor = new Video({
      video: newvideo
    });
    thor.save(function(err, thor) {
      if (err) return console.error(err);
      // console.dir(thor);
    });
  });

  router.delete('/', function(req, res){
    var removevideo = res.req.body.video;
    console.log('response from router.delete-video :', removevideo);
    mongoose.model('Video').remove({"video": removevideo }, function(){
      console.log('item removed');
    });
  });




});

module.exports = router;
