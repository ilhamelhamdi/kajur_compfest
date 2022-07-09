var express = require('express');
const UserHandler = require('../handlers/users');
var router = express.Router();

router.post('/', function (req, res, next) {
  UserHandler.register(req, res)
});

module.exports = router;
