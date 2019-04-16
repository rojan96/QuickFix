const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const db = require('../config/database');
const {or} = require('sequelize').Op;

//getting the user model
const User = require ('../models/user');

//displaying the register form
router.get('/register', (req,res)=>{
    res.render('register');
})


//registring a user
router.post('/register', (req, res)=> {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Password must be at least 8 characters long including one upper case, one lower case and one special characther').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){ //rerenders the page if any errors and displays them
        console.log(errors);
        res.render('register', {
          errors:errors
        });
    } else{ 
        //checking for an existing account
        User.findOne({where:{
            [or]:[
                {email:email},
                {username:username}
            ]
        }}).then(user=>{
            if(user){
                res.render('register', {
                    errors:[{msg:"A user with such a username or email already exists"}]
                  }); 
            }else{
                let newUser = new User({ //creating user object with input values to insert into database
                    name:name,
                    email:email,
                    username:username,
                    password:password
                });
        
            
                //hashing the password and storing it
                bcrypt.genSalt(10, function(err, salt){
                    bcrypt.hash(newUser.password, salt, function(err, hash){
                        if(err){
                            console.log(err);
                            return
                        }
                        newUser.password = hash;
                        newUser.save()
                        .then(user=>{
                            req.flash('success','You are now registered and can log in');
                            res.redirect('/users/login');
                        })
                        .catch(err=>{
                            console.log(err);
                            return;
                        });
                    });
                    });
            }
        })

        
        }
});

//login form
router.get('/login', function(req, res){
    res.render('login');
});

//login process
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/',
      failureRedirect:'/users/login',
      failureFlash: true
    })(req, res, next);
});

//logout process
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/users/login');
});



module.exports = router;