var express = require('express');
var router = express.Router();
const auth = require('./auth');

router.use('/', auth);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

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
module.exports = router;
