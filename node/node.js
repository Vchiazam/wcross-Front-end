// const http = require('http')
// const port = 3000
// const fs = require('fs')
// const server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-Type': 'text/html' });
//     // res.end()
//     fs.readFile('index.html', null, function(error, data) {
        
  
//     if (error)
//         console.log('nan')
//     else
//         res.write(data)
//           })
    
//           res.end()
// })
// server.listen(port, function (error) {
//     if (error)
//         console.log('nan')
//     else
//         console.log('ok')
// })


const express = require('express');
const app = express()
const path = require('path');
const router = express.Router();

app.get('/', (req, res) => {
    res.sendFile('/style.css')
})

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname , '/index.html'));
});
app.use('/', router);
app.listen(process.env.port || 3000);
console.log('aaaa')
