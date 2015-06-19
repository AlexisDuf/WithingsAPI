'use strict';
var path = require('path');
// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/withingsapi',
    options: {
      db: {
        safe: true
      }
    }
  },

  root: path.normalize(__dirname + '/../../..'),
};
