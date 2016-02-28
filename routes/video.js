var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');

// mongoose.model('videos', {name: String});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;
  var URL = 'mongodb://localhost:27017/mydatabase';
  MongoClient.connect(URL, function(err, db) {
    if (err) {
      console.log('there is an error with videos mongodb connection, please check!')
      return}
    else {
      console.log('Connected and Running videos  Mongo Db...');
      var collection = db.collection('videos');
      // get
      collection.find(function(err, result) {
        collection.find().toArray(function(err, videos) {
          console.log(videos.length);

          //pass video array of objects
          res.render('video', { title: 'MYMusic',
            className: 'video', 
            videos: videos
          });

          console.log(videos);
          // db.close();
        });
      });
    }
  });
});




    // create
    // collection.insert({name: 'taco', tasty: true}, function(err, result) {
    //   collection.find({name: 'taco'}).toArray(function(err, docs) {
    //     console.log(docs[0]);
    //     db.close();
    //   });
    // });






module.exports = router;
