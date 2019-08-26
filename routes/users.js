var express = require('express');
var router = express.Router();
const user = require('../controllers/users')
const db = require('../db')

/* GET users listing. */
router.get('/users', function(req, res, next) {
  console.log(req)
  userId = req.session.user.id
  res.send(user.profile(userId))
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




module.exports = router;
