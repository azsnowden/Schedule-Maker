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

router.get('/employee-dashboard', (req, res, next) => {
  res.render('employee-dashboard', {
  });
})

router.get('/admin-dashboard', (req, res, next) => {
  res.render('admin-dashboard', {
  });
})

router.get('/calendar', (req, res, next) => {
  res.render('admin-calendar', {
  });
})
const msgs = [
  {"to":"ben", "from":"armond", "timestamp": "11:31am", "message":"lol cats"},
  {"to":"armond", "from":"ben", "timestamp": "11:32am", "message":"be well soon"},
];
router.get('/message', (req, res) => {
  res.render('message', {
    "msgs": msgs,
    // "me" : req.session.user
  });
});

// router.get('/admin/')

module.exports = router;
