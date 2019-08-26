var express = require('express');
var router = express.Router();
const auth = require('./auth');

router.use('/', auth);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/about', function(req,res,next){
  res.render('about',)
}
)

router.get('/register', (req, res, next) => {
  if (req.session.user){
  res.render('register', {
  });}
  else{
    res.redirect('/login')
  }
})

router.get('/register_business', (req, res, next) => {
  if (req.session.user){
    res.render('register_admin', {
  });}
  else{
    res.redirect('/login')
  }
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
