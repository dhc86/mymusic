var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('music', { title: 'MYMusic',
    className: 'music'
  });
});

module.exports = router;
