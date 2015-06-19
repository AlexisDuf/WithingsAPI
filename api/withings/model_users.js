'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var AuthWithingsSchema = new Schema({
  withingsId: String,
  accessToken: String,
  accessTokenSecret: String
});

AuthWithingsSchema.plugin(findOrCreate);

module.exports = mongoose.model('AuthWithings', AuthWithingsSchema);
