
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// mongoose.connect('mongodb://localhost/mydatabase');
mongoose.connect('mongodb://diego.herrera:cq8bul7i@ds019698.mlab.com:19698/mymusic_database');

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  // Create your schemas and models here.
  var movieSchema = new mongoose.Schema({
    title: String
  });

  // Compile a 'Movie' model using the movieSchema as the structure.
  // Mongoose also creates a MongoDB collection called 'Movies' for these documents.
  var Movie = mongoose.model('Movie', movieSchema);
  router.get('/', function(req, res, next) {
    mongoose.model('Movie').find(function(err, titles){
      res.render('testdb', { title: 'MYMusic',
        className: 'index',
        names: titles
      });
      console.log('names: ', titles);
      // for (var i = 0; i < titles.length ; i++){
      //   console.log('videos id: ', titles[i]._id);
      //   console.log('videos video: ', titles[i].title);
      //   console.log('-------------------')
      // }
    });
  });
  router.post('/', function(req, res){
    var newmovie = res.req.body.title;
    console.log('response :', newmovie);
    var thor = new Movie({
      title: newmovie
    });
    thor.save(function(err, thor) {
      if (err) return console.error(err);
      console.dir(thor);
    });
  });

});


  // delete
  // Movie.find(function(err, movies) {
  //   if (err) return console.error(err);
  //   else {
  //     Movie.remove({'title':'diego'});
  //     console.dir(movies);
  //   }
  // });

  //get
  // Movie.find(function(err, movies) {
  //   if (err) return console.error(err);
  //   console.dir(movies);
  // });

/* GET home page. */

// make this available to our Node applications
module.exports = router;
