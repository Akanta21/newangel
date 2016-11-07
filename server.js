var express = require('express')
var http = require('http')
var path = require('path')
var app = express()

const PORT = process.env.PORT || 4000

app.use(express.static('public'))

function requireHTTPS(req, res, next) {
  if(req.headers['x-forwarded-proto'] != 'https' && process.env.NODE_ENV === 'production') {
    return res.redirect('https://' + req.hotname + req.url)
  }
  next()
}

app.use(requireHTTPS)

app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

var server = http.createServer(app)

server.listen(PORT, function () {
  console.log('Express server is up on port', PORT)
})
// https.createServer(options, app).listen(PORT)
