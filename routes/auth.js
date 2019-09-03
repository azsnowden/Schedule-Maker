const express = require('express');
const router = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
const util = require('util');
const url = require('url');
const querystring = require('querystring');
const Users = require('../models/users')


dotenv.config();

// Perform the login, after login Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
    scope: 'openid email profile'
}), function (req, res) {
    res.redirect('/');
});

// Perform the final stage of authentication and redirect to /register or '/user'
router.get('https://scheduler.bendavenport.co/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, async function (err) {
            if (err) { return next(err); }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            const checkUser = await Users.userExists(user)
            if (checkUser){
                // console.log(checkUser)
                req.session.user = checkUser
                res.redirect(returnTo || '/users/profile');
                }
            else{
                req.session.user = user.emails[0].value
                res.redirect('/register')
                }
        });
    })(req, res, next);
});

// Perform session logout and redirect to homepage
router.get('/logout', (req, res) => {
    req.logout();

    const returnTo = req.protocol + '://' + req.hostname;
    const port = req.connection.localPort;
    if (port !== undefined && port !== 80 && port !== 443) {
        returnTo += ':' + port;
        }
    const logoutURL = new URL(
        util.format('https://%s/v2/logout', process.env.AUTH0_DOMAIN)
        );
    var searchString = querystring.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        returnTo: returnTo
        });
    logoutURL.search = searchString;

    res.redirect(logoutURL);
    // res.redirect('/')
});

module.exports = router;