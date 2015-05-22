var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var db = require('../models/db');

router.get('/:id', function(req, res) {
  // Read item from database and return
  db('items', function(items) {
    items.findOne({ _id: ObjectID(req.params.id) }, function(err, item) {
      res.json(item);
    });
  });
});

router.post('/:id/fav', function(req, res) {
  db('items', function(items) {
    items.findOneAndUpdate({
      _id: ObjectID(req.params.id)
    }, {
      $addToSet: { fav: req.cookies.id }
    }, {
      returnOriginal: false
    }, function(err, result) {
      res.json(result.value);
      // châo jī kê ài dè xué zhâng
    });
  });
});

router.post('/:id/unfav', function(req, res) {
  db('items', function(items) {
    items.findOneAndUpdate({
      _id: ObjectID(req.params.id)
    }, {
      $pull: { fav: req.cookies.id }
    }, {
      returnOriginal: false
    }, function(err, result) {
      res.json(result.value);
      // châo jī kê ài dè xué zhâng
    });
  });
});

router.post('/:id/del', function(req, res) {
  db('items', function(items) {
    items.findOneAndUpdate({
      _id: ObjectID(req.params.id)
    }, {
      $addToSet: { del: req.cookies.id }
    }, {
      returnOriginal: false
    }, function(err, result) {
      res.json(result.value);
      // châo jī kê ài dè xué zhâng
    });
  });
});

module.exports = router;
