var express = require('express')
var https = require('https')
var fs = require('fs')
var path = require('path')
const PORT = process.env.PORT || 4000

var app = express()

var options = {
  key: fs.readFileSync('certs/server.key'),
  cert: fs.readFileSync('certs/server.crt')
}

app.use(function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('https://' + req.hostname + req.url)
  } else {
    next()
  }
})

app.use(express.static('public'))
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// app.listen(PORT, function () {
//   console.log('Express server is up on port', PORT)
// })

https.createServer(options, app).listen(PORT)
