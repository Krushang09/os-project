// Authorization and Authentication
const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/OS_P_DB');

const userSchema = mongoose.Schema({
  // firstname: String,
  // lastname: String,
  // email: String,
  username: String,
  password: String,
  secret: String
});

userSchema.plugin(plm);

// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;


module.exports = mongoose.model("user", userSchema);