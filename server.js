const dotenv = require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var path = require('path');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname));

const server = app.listen(8000, () => {
  console.log('Server listening on port %d in %s mode', 
    server.address().port, app.settings.env);
})

var localtunnel = require('localtunnel');
var tunnel = localtunnel(server.address().port, {subdomain: 'newhouse'},
  function(err, tunnel) {
    console.log(`tunnelling through ${tunnel.url}`)

    tunnel.url;

  });

app.get('/', (req, res) => {
	fs.readFile('index.html',function (err, data){
        res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
        res.write(data);
        res.end();
    });
})
