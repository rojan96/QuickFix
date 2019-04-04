const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require('path')
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

const app =express();


app.get('/', (req,res) => {
    
    fs.readFile('index.html', (err,html) => {
        if(err){
            throw err;
        }
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    })

})

app.listen(port, hostname, ()=>{
    console.log('Server started on port ' + port)
})

