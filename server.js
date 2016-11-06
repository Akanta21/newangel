var https = require('https')
var fs = require('fs')
var express = require('express')
var path = require('path')
var app = express()

var options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.crt')
}
const PORT = process.env.PORT || 4000

function requireHTTPS(req, res, next) {
  if(!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}

app.use(requireHTTPS);

app.use(express.static('public'))
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// app.listen(PORT, function () {
//   console.log('Express server is up on port', PORT)
// })
https.createServer(options, app).listen(5443)
