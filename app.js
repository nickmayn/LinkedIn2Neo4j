const express = require("express");
const neo4jconnection = require('./models/neo4jconnection');
const app = express();
const session = require('express-session');
const passport = require('passport');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const routes = require('./routes.js');
const config = require('./config')

app.set('view engine', 'ejs');

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

passport.use(new LinkedInStrategy({
  clientID: config.linkedinAuth.clientID,
  clientSecret: config.linkedinAuth.clientSecret,
  callbackURL: config.linkedinAuth.callbackURL,
  scope: ['r_emailaddress', 'r_liteprofile'],
}, function (token, tokenSecret, profile, done) {
  return done(null, profile);
}
));




app.set('view engine', 'ejs')


app.use('/', routes);

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/views/homepage.html')
// })

app.get('/graph-tool', (req, res) => {
  res.sendFile(__dirname + '/views/graphvis.html')
})

// app.get('/login', (req, res) => {
//   res.sendFile(__dirname + '/views/login-form.html')
// })

app.get('/login-icon.png', (req, res) => {
  res.sendFile(__dirname + '/login-icon.png')
})

app.get('/author.jpg', (req, res) => {
  res.sendFile(__dirname + '/author.jpg')
})



app.get('/about', (req, res) => {
  res.sendFile(__dirname + '/views/about.html');
 });

app.use('/models', neo4jconnection);

console.log('Server Up')

app.listen(2345)



