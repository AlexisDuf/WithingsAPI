var CronJob = require('cron').CronJob;

var WithingsOAuth = require('./../api/withings/OAuth_Withings');

var job = new CronJob({
  cronTime: '00 00 12 * * 0-6',
  onTick: function() {
    /*
     * Runs every day
     * at 00:00:00 AM.
     */
     console.log('stroring');
     WithingsOAuth.storeSleepMeasure();
  },
  start: false,
  timeZone: 'Europe/Paris'
});

module.exports = job;
