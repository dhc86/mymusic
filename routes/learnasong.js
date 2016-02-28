var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('learnasong', { title: 'MYMusic',
//     className: 'learnasong'
//   });
// });

router.get('/', function(req, res, next) {
  var MongoClient = require('mongodb').MongoClient;
  var URL = 'mongodb://localhost:27017/mydatabase';
  MongoClient.connect(URL, function(err, db) {
    if (err) {
      console.log('there is an error with videos mongodb connection, please check!')
      return}
    else {
      console.log('Connected and Running learnasong  Mongo Db...');
      var collection = db.collection('learnasong');
      // get
      collection.find(function(err, result) {
        collection.find().toArray(function(err, learnasongvideos) {
          console.log(learnasongvideos.length);

          //pass video array of objects
          res.render('learnasong', { title: 'MYMusic',
            className: 'learnasong', 
            videos: learnasongvideos
          });

          console.log(learnasongvideos);
          // db.close();
        });
      });
    }
  });
});


module.exports = router;
