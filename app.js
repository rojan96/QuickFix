const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const app = express();

//template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

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

app.post('/login', (req,res)=>{
    console.log('Logged in');
})

app.listen(port, hostname, ()=>{
    console.log('Server started on port ' + port)
})

