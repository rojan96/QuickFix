const db = require('../database');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');


module.exports= (passport)=>{
    passport.use(new LocalStrategy((username,password,done)=>{
        User.findOne({username:username}, (err, user)=>{
            if(err) throw err;
            if(!user) return done(null, false, {message: 'No user found'});
            

            //match passwords
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch) return done(null,user);
                else return done(null,false,{message: 'Wrong password'});
                
            })
        })
    }));
}