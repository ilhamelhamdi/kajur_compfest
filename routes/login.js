var express = require('express');
var router = express.Router();
const UserHandler = require('../handlers/users')

router.post('/', function (req, res, next) {
  UserHandler.login(req, res)
});

module.exports = router;
