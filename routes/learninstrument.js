var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('learninstrument', { title: 'MYMusic',
//     className: 'learninstrument'
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
      console.log('Connected and Running learninstrument  Mongo Db...');
      var collection = db.collection('learinstrument');
      // get
      collection.find(function(err, result) {
        collection.find().toArray(function(err, learninstrumentvideos) {
          console.log(learninstrumentvideos.length);

          //pass video array of objects
          res.render('learninstrument', { title: 'MYMusic',
            className: 'learninstrument', 
            videos: learninstrumentvideos
          });

          console.log(learninstrumentvideos);
          // db.close();
        });
      });
    }
  });
});



module.exports = router;
