var express = require('express');
var router = express.Router();

const userModel = require('./users');
const passport = require('passport');
const localStrategy = require("passport-local");

passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/user', isLoggedIn, function(req, res, next) {
  res.render('homelogin');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

// router.get('/signup', function(req, res, next) {
//   res.render('signup');
// });

router.get('/about',function(req, res, next) {
  res.render('about');
});

router.post('/signup', function(req, res, next) {
  console.log(req.body);
  var userdata = new userModel({
    // firstname: req.body.firstname,
    // lastname: req.body.lastname,
    // email: req.body.email,
    username: req.body.username,
    secret: req.body.secret
  });



  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("local")(req, res, function() {
        res.redirect('/user');
      })
    })
});

router.post("/login", passport.authenticate("local", {
  successRedirect: '/user',
  failureRedirect: '/login'
}), function (req, res) {})

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});


router.get('/services/sjf', function(req, res, next) {
  res.render('sjf');
});

router.get('/services/dp', function(req, res, next) {
  res.render('dp');
});

router.get('/services/clook', function(req, res, next) {
  res.render('clook');
});

router.get('/services/fifo', function(req, res, next) {
  res.render('fifo');
});

router.get('/services', function(req, res, next) {
  res.render('services');
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
