const fs = require('fs');
const http = require('http')
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;



http.createServer((req,res) => {
    
    index = fs.readFile('index.html', (err,html) => {
        if(err){
            throw err;
        }
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/html');
        res.write(html);
        res.end();
    })

}).listen(port, hostname, ()=>{
    console.log('Server started on port' + port)
})

