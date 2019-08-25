const db = require('../db')


//Get the email from Google and check in db for value
//return False if no user found.
//Otherwise return user.

async function userExists(email){
    real_email = email.emails[0].value
    const user = await db.any('select * from users WHERE email=$1', [real_email])
    console.log(user.length)
    if (user.length){
        return user[0]
    }
    return false
}

module.exports = {userExists,}