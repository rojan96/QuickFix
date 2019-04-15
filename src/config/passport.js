const db = require('./database');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');


module.exports = (passport)=>{
  passport.use(new LocalStrategy((username,password,done)=>{
    User.findOne({username:username})
    .then(user=>{
        if(!user) return done(null, false, {message: 'No user found'});

        bcrypt.compare(password, user.password, (err, isMatch)=>{
          if(err) throw err;
          if(isMatch) return done(null,user);
          else return done(null,false,{message: 'Wrong password'});
        })
    }).catch(err=> { if(err) throw err}); 
    }));
  
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findByPk(id)
      .then(user=>{
        done(null, user);
      }).catch(err=>{
        done(err,null);
      });
  });    
};



