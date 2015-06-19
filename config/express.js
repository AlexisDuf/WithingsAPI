/**
 * Express configuration
 */

'use strict';


var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');
var session = require('express-session')
var path = require('path');
var config = require('./environment/development');


module.exports = function(app) {

  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(session({ secret: "crazysecretstuff"}));


  //app.use(require('connect-livereload')());
  app.use(express.static(path.join(config.root, 'client')));
  app.set('appPath', 'client');
  app.use(morgan('dev'));
  app.use(errorHandler());

}
