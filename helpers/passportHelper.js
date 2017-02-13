const bcrypt        = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
let User = require('../models/user');

module.exports = function(passport) {
	passport.serializeUser((user, cb) => {
	  cb(null, user);
	});

	passport.deserializeUser((user, cb) => {
	  User.findOne({ "_id": user._id }, (err, user) => {
	    if (err) { return cb(err); }
	    cb(null, user);
	  });
	});

	passport.use(new LocalStrategy({
  		passReqToCallback: true
		}, (req, username, password, next) => {
		  User.findOne({ username }, (err, user) => {
		    if (err) {
		      return next(err);
		    }
		    if (!user) {
		      return next(null, false, { message: "Incorrect username" });
		    }
		    if (!bcrypt.compareSync(password, user.password)) {
		      return next(null, false, { message: "Incorrect password" });
		    }

		    return next(null, user);
		  });
		}));
}