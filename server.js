const express = require('express');
const app = express();
const path = require('path');
// app.use(express.static(path.join(__dirname + 'src')))
app.use(express.static('src'));
app.use(express.static('dist'));
app.get('/', function(req, res) {
   res.redirect('index.html');
})

app.get('/*.html', function(req, res) {
   console.log(req._parsedUrl)
   res.sendFile(path.join(__dirname + '/src/html'+req._parsedUrl.pathname))
});
app.get('*.js', function(req, res) {
   res.sendFile(path.join(__dirname + '/dist/bundle.js'));
})

app.listen(8000);
