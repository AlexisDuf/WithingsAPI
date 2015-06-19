'use strict';

var express = require('express');
var controller = require('./controller_withings');


var router = express.Router();

router.get('/', controller.connect);
router.get('/redirect', controller.dataAccess);
router.get('/store_manually', controller.store_manually);

module.exports = router;
