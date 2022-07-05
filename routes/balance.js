var express = require('express');
const { getBalanceHandler, putBalanceHandler } = require('../handlers/balance');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  getBalanceHandler(req, res)
});

router.put('/', function (req, res, next) {
  putBalanceHandler(req, res)
});


module.exports = router;
