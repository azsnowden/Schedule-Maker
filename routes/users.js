var express = require('express');
var router = express.Router();
const user = require('../controllers/users')
const admin = require('../controllers/admin')
const db = require('../db')


/* GET users listing. */
router.get('/profile', async function(req, res, next) {
  // console.log('/Users, req:', req.session.user)
  const userId = req.session.user.id
  const userInfo = await user.profile(userId)
  // console.log(userInfo.business)
  const {displayname, email, phone_number} = userInfo
  const business = userInfo.business.business_name
  console.log(business)
  // console.log('UserId:', userId)
  // res.send(user.profile(userInfo))
  // console.log(userInfo)
  res.render('profile', {userInfo, displayname, email, phone_number, business});
});

//ACKAKC WILL THIS WORK? 
// router.get('/admin', (req, res, next) => {
//   if (req.session.user.admin === true){
//     res.render('/admin/', {
//   });}
//   else{
//     res.redirect('/employee-dashboard')
//   }
// })

router.get('/admin/employees', async function(req, res, next) {
  // console.log('/Users, req:', req.session.user)
  const userId = req.session.user.id;
  const employeeList = await admin.employeeList(userId);
  const userInfo = await user.profile(userId);
  const business = userInfo.business.business_name;
  res.render('employee_directory', {employeeList, business, userInfo});
});

router.post('/registerProcess', (req, res, next) => {
  const email = req.session.user;
  console.log(email)
  const {displayname, phone_number, business_id} = req.body
  function insertUser(){
    const insertUserQuery =`INSERT INTO users (displayname, email, phone_number, business_id)
      VALUES
      ($1,$2,$3,$4)
      returning id`
  db.one(insertUserQuery, [displayname, email, phone_number, business_id]).then((resp)=>{
    res.json({
      msg: "useradded"
    })
  })
}
  insertUser();
});

router.post('/registerNewBusinessProcess', async (req, res, next) => {
  const {email} = req.session.user;
  const {address, business_name, business_email, displayname, phone_number} = req.body
    const insertBusinessQuery =`INSERT INTO businesses (address, business_name, business_email)
      VALUES ($1,$2,$3) 
      returning id`
    const businessID = await db.one(insertBusinessQuery, [address, business_name, business_email]).then((resp)=>{
        const {id, business_email} = resp
        return resp;
      })
    .catch(err => res.json({message: "failed"}))
  
    const insertUserQuery = `INSERT INTO users (displayname, email, phone_number, business_id, admin_user)
    VALUES
    ($1,$2,$3,$4, $5)
    returning id`
  db.one(insertUserQuery, [displayname, email||'null@null.null', phone_number, resp.id, true]).then((resp)=> res.json({
    msg: `user added`
  }))
});


//Employee's Dashboard
/* GET Employee-Dashboard page. */
router.get('/employee-dashboard', async(req,res,next) =>{
  const userId = req.session.user.id;
  const userInfo = await user.profile(userId);
  const business = userInfo.business.business_id;
  console.log(userInfo)
  const event = await db.any('select * from schedule where user_id=$1',[userId])
  const calendarEvents = event.map(data => {
    return {
      "start":data.start_time,
      "end": data.end_time
    }
  })

  res.render('employee-dashboard',{calendarEvents, userInfo})
})

/*get Admin-Dashboard. */
router.get('/admin/dashboard', async (req, res, next) => {
  const userId = req.session.user.id;
  const userInfo = await user.profile(userId)
  console.log(userInfo)
  const business = userInfo.business_id;
  const event = await db.any('select * from schedule where business_id=$1',[business])
  const calendarEvents = event.map(data => {
    return {
      "start":data.start_time,
      "end": data.end_time,
      userInfo
    }
  })
  res.render('admin-dashboard', {calendarEvents, userInfo
  });
})


//Schedule Form
router.get('/admin/schedule', async (req,res,next)=>{
  const userId = req.session.user.id;
  // const userId = 5;
  const employeeList = await admin.employeeList(userId);
  const userInfo = await user.profile(userId);
  const business = userInfo.business.business_name;
  res.render('admin-schedule', {employeeList, business, userInfo})
})


// //Schedule Post
router.post('/schedulePost', async (req, res, next) => {
  // const parsed = JSON.parse(req.body);
  // console.log(req.body.displayname)
  // console.log(req.body['start-time'])
  // console.log(req.body['end-time'])
  const {displayname, startdate, starttime, enddate, endtime} = req.body
  const new_start = `${startdate} ${starttime}`
  const new_end = `${enddate} ${endtime}`

  const userInfo = await db.one('select * from users where displayname=$1',[displayname])
  const businessId = userInfo.business_id;
  const userId = userInfo.id;

  const insertScheduleQuery = await `INSERT INTO schedule (user_id, business_id, start_time, end_time)
      VALUES ($1,$2,$3, $4) 
      returning id`
    db.one(insertScheduleQuery, [userId, businessId, new_start, new_end]).then((resp)=> res.redirect('/users/admin/schedule'))
    .catch(err => res.json({message: err}))
  });

module.exports = router;
