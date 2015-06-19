'use strict';

var express = require('express');
var controller = require('./controller_withings');


var router = express.Router();

router.get('/', controller.connect);
router.get('/redirect', controller.dataAccess);
router.get('/sleep_measure', controller.sleepMeasure);

/*router.route('/connect').get(function(req, res){
  WithingsOAuth.authenticate(req, res);
});*/
//router.get('/', controller.index);


module.exports = router;
