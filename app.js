const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const db = require('./src/config/database');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();

//template engine for html rendering
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));
  
// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
next();
});

// Express Validator Middleware
app.use(expressValidator({
errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
    , root    = namespace.shift()
    , formParam = root;

    while(namespace.length) {
    formParam += '[' + namespace.shift() + ']';
    }
    return {
    param : formParam,
    msg   : msg,
    value : value
    };
}
}));

// Passport Config for log in
require('./src/config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


const UsersRoute = require('./src/routes/users');

app.use('/users', UsersRoute);


//index.ejs rendering
app.get('/', (req,res) => {
    
    res.render('index',{
        nav: [
            { link: '/', title: 'Home', current: 'class="sr-only">(current)' },
            { link: '/users/register', title: 'Register' },
            { link: '/users/login', title: 'Log In' },
            { link: '/users/logout', title: 'Log Out' },
            { link: '/about', title: 'About' },
            { link: '/contact', title: 'Contact' }
        ],
        title: "Welcome to QuickFix Troy!"
    });

})



app.listen(port, hostname, ()=>{
    console.log('Server started on port ' + port)
})

