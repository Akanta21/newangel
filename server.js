var express = require('express'),
   env = process.env.NODE_ENV || 'development';
var path = require('path')
var app = express()

const PORT = process.env.PORT || 4000

function requireHTTPS(req, res, next) {
  if(req.headers['x-forwarded-proto'] != 'https') {
    return res.redirect('https://' + req.get('host') + req.url)
  }
  next()
}

app.use(requireHTTPS);

app.use(express.static('public'))
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.listen(PORT, function () {
  console.log('Express server is up on port', PORT)
})
// https.createServer(options, app).listen(PORT)
