var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('learninstrument', { title: 'MYMusic',
    className: 'learninstrument'
  });
});

module.exports = router;
