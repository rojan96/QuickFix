const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const config = require('./src/config/database');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();

//template engine
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

// Passport Config
require('./src/config/passport')(app);



const RegisterRoute = require('./src/routes/register');

app.use('/register', RegisterRoute);


//index.ejs rendering
app.get('/', (req,res) => {
    
    res.render('index',{
        nav: [
            { link: '/', title: 'Home', current: 'class="sr-only">(current)' },
            { link: '/about', title: 'About' },
            { link: '/contact', title: 'Contact' }
        ],
        title: "Welcome to QuickFix Troy!"
    });

})

app.get('/login', (req,res)=>{
    res.send("Hello");
    console.log('Logged in');
})

app.listen(port, hostname, ()=>{
    console.log('Server started on port ' + port)
})

