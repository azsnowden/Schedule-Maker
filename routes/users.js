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
  res.render('profile', {displayname, email, phone_number, business});
});

router.get('/admin/employees', async function(req, res, next) {
  // console.log('/Users, req:', req.session.user)
  const userId = req.session.user.id;
  const employeeList = await admin.employeeList(userId);
  const userInfo = await user.profile(userId);
  const business = userInfo.business.business_name;
  res.render('employee_directory', {employeeList, business});
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

module.exports = router;
