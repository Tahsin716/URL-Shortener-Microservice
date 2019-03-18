'use strict';

var URL = require('../models/URL.js');
var dns = require('dns');

exports.addUrl = (req, res) => {
  var newUrl = req.body.url;
  
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  
  if (newUrl.match(regex)) {
    var short = Math.floor(Math.random() * 1000000).toString();
    
    var data = new URL(
        {
            original: newUrl,
            url: short
        }
    );
   
    data.save(err=>{
      if(err){
       return res.send('Error saving to database');
      }
    });
    
    return res.json(data);
	}
  
  var data = new URL(
	    {
	        original: 'urlToShorten',
	        url: 'Invalid URL'
	    }
	);
  
  return res.json(data);
}


exports.processShortUrl = (req, res, next) => {
  var findUrl = res.params.shurl;
  
  findUrl.findOne({'url': findUrl}, (err, data) => {
    if (err) {
      res.send("This shorterUrl does not exist.");
    }
    else {
      res.redirect(301, data.original);
    }
    res.end();
 }); 
}
