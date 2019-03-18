'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var URL = new Schema ({
  original : {type: String, required: true},
  url: {type: String, required: true},
  index : {type: Number, required: true}
});

module.exports = mongoose.model('URL', URL);