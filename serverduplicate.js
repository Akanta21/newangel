'use strict'
var express = require('express')
var https = require('https')
var fs = require('fs')
var path = require('path')

var app = express()
// const PORT = process.env.PORT || 4000
// const securePort = 3023

// This line is from the Node.js HTTPS documentation.
var options = {
  key: fs.readFileSync('certs/key.pem'),
  cert: fs.readFileSync('certs/cert.pem')
}

// START --== Your App Code ==--
app.get('/', function(req, res, next) {
    res.json({
        app: 'Foobar App'
    });
});

// app.use(function (req, res, next) {
//   if (req.headers['x-forwarded-proto'] === 'https') {
//     res.redirect('http://' + req.hostname + req.url)
//   } else {
//     next()
//   }
// })
//
// app.use(express.static('public'))
// app.get('*', function (request, response) {
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })
//
// // app.listen(PORT, function () {
// //   console.log('Express server is up on port', PORT)
// // })

https.createServer(options, app).listen(8000)
