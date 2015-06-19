'use strict';

var WithingsOAuth = require('./OAuth_Withings');

var AuthWithings = require('./model_users');

module.exports = {
  connect : function(req, res){
    WithingsOAuth.authenticate(req, res);
  },
  dataAccess : function(req, res){
    WithingsOAuth.getAccessToken(req, res);
  },
  store_manually : function(req, res){
    WithingsOAuth.storeSleepSummary();
  }
}
