const passport = require('passport');
require('./strategies/local_strategy')(passport);

module.exports = (app) =>{
  
  // Passport Middleware
  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};