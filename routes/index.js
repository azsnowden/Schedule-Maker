var express = require('express');
var router = express.Router();
const auth = require('./auth');

router.use('/', auth);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', (req, res, next) => {
  res.render('register', {
  });
})

// router.get('/admin/')

module.exports = router;
