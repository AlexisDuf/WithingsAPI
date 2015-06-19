'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var SleepSummarySchema = new Schema({
  withingsId: String,
  lengthSeries: Number,
  dataSummary: String
});

SleepSummarySchema.plugin(findOrCreate);

module.exports = mongoose.model('SleepSummaryModel', SleepSummarySchema);
