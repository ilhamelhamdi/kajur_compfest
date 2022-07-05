var express = require('express');
const { postItemHandler, getAllItemsHandler, getItemByIdHandler, putItemHandler, deleteItemHandler } = require('../handlers/items');
var router = express.Router();


/* GET home page. */
router.get('/', function (req, res, next) {
  getAllItemsHandler(req, res)
});

router.get('/:id', function (req, res, next) {
  getItemByIdHandler(req, res)
});

router.post('/', function (req, res, next) {
  postItemHandler(req, res)
});

router.put('/:id', function (req, res, next) {
  putItemHandler(req, res)
});

router.delete('/:id', function (req, res, next) {
  deleteItemHandler(req, res)
});

module.exports = router;
