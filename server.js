'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');
var bodyParser = require('body-parser');

var URLController = require('./controllers/URLController.js');

var app = express();

// Basic Configuration 
var mongoURL = process.env.MONGOLAB_URI;
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(mongoURL);

app.use(cors());
app.use(bodyParser.urlencoded({'extended': false}));

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post('/api/shorturl/new', URLController.addUrl);
  
app.get('/api/shorturl/:shurl', URLController.processShortUrl);


app.listen(port, function () {
  console.log('Node.js listening ...');
});