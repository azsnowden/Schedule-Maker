var express = require('express');
var router = express.Router();
const user = require('../controllers/users')
const db = require('../db')

/* GET users listing. */
router.get('/users', function(req, res, next) {
  console.log(req)
  userId = req.session.user.id
  // res.send(user.profile(userId))
  res.send('respond with a resource');
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
        const {id} = resp
        return id;
      })
    .catch(err => res.json({message: "failed"}))
    const insertUserQuery = `INSERT INTO users (displayname, email, phone_number, business_id, admin_user)
    VALUES
    ($1,$2,$3,$4, $5)
    returning id`
  db.one(insertUserQuery, [displayname, email||'null@null.null', phone_number, businessID, true]).then((resp)=> res.json({
    msg: `user added`
  }))
});

module.exports = router;
