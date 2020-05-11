var express = require('express');
var router = express.Router();
var {signin} = require('../controllers/auth')

router.post('/signin',signin);

module.exports = router;