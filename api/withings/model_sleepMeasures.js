'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var SleepMeasureSchema = new Schema({
  withingsId: String,
  startDate : Date,
  enddate : Date,
  dataMeasure: String
});

SleepMeasureSchema.plugin(findOrCreate);

module.exports = mongoose.model('sleepMeasureModel', SleepMeasureSchema);
