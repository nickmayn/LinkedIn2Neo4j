const passport = require('passport');
const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/homepage.html')
  })

router.get('/login', function (req, res) {
  res.render('index.ejs'); // load the index.ejs file
});

router.get('/profile', isLoggedIn, function (req, res) {
  res.render('profile.ejs', {
    user: req.user // get the user out of session and pass to template
  });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile', 'r_1st_connections'],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;