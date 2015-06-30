'use strict';

var WithingsOAuth = require('./OAuth_Withings');

var AuthWithings = require('./model_users');
var Sleep_measure = require('./model_sleepMeasures');
var Sleep_summary = require('./model_sleepSummary');

module.exports = {
  connect : function(req, res){
    WithingsOAuth.authenticate(req, res);
  },
  dataAccess : function(req, res){
    WithingsOAuth.getAccessToken(req, res);
  },
  store_manually : function(req, res){
    WithingsOAuth.storeSleepSummary(req, res);
  },
  getSleepInfo: function(req, res){
    Sleep_summary.find().sort('-lengthSeries').exec(function(err, data){
      if (err) {
        res.json(err);
      }
      var summary = data[0];


      Sleep_measure.find({'withingsId': summary.withingsId}).sort('startDate').exec(function(err, measures){
        var bodySummary = JSON.parse(summary.dataSummary);
        var bodyMeasures = [];



        for (var i = 0; i < measures.length; i++) {
          var body = JSON.parse(measures[i].dataMeasure);
          bodyMeasures.push(body.body);
        }

        res.json({
          id: summary.withingsId,
          summary: bodySummary.body,
          measures : bodyMeasures
        })
      });
    });
  }
}
