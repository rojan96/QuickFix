var fs = require('file-system');
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

fs.readfile('index.html', (err,html) => {
    if(err){
        throw err;
    }

    const server = createServer((req,res) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        res.write(html);
        res.end();
    })

    server.listen(port, hostname, ()=>{
        console.log('Server started on port' + port)
    })
})
