module.exports = {
	setCurrentUser: function(req, res, next) {
		console.log('session in setCurrentUser: ', req.session);
		
	  if (req.session.passport) {
	  	console.log('if session passport: ', req.session);
	    res.locals.currentUser = req.session.passport;
	    res.locals.isUserLoggedIn = true;
	  } else {
	  	// delete res.locals.currentUser;
	    res.locals.isUserLoggedIn = false;
	  }
	  console.log('res.locals in setCurrentUser: ', res.locals);
	  next();
	},

	checkLoggedIn: function(message, route) {
	  return function(req, res, next) {
	    if (req.isAuthenticated()) {
	      return next(); 
	    } else {
	    	req.flash('error', message )
	    	
	      res.redirect(route)
	    }
	  }
	},

	checkCredentials: function(role) {
	  return function(req, res, next) {
	    if (req.user.role === role) {
	      return next(); 
	    } else {
	    	req.flash('error', "you don't have permission" );
	      res.redirect('/login');
	    }
	  }
	},
}