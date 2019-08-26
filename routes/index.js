var express = require('express');
var router = express.Router();
const auth = require('./auth');
const user = require('../controllers/users')
const db = require('../db')

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

router.get('/employee-dashboard', async(req,res,next) =>{
  const userId = '1';
  // const userInfo = await user.profile(userId)
  const business = 1;
  const event = await db.any('select * from schedule where business_id=$1',[business])
  const calendarEvents = event.map(data => {
    return {
      "start":data.start_time,
      "end": data.end_time
    }
  })

  res.render('employee-dashboard',{calendarEvents})
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
