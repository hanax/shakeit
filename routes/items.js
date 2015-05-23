var express = require('express');
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;

var db = require('../models/db');

router.get('/fav', function(req, res) { 
  db('items', function(items) {
    items.find({ fav: [req.cookies.id] }).toArray(function(err, items) {
      items.forEach(function(item) {
        if (item.image.indexOf('zdmimg.com') >= 0) {
          item.image = "http://loremflickr.com/320/240/cute,animal";
        }
      });

      res.render('fav_list', {
        starred: items,
      });
    });
  });
});

router.get('/:id', function(req, res) {
  // Read item from database and return
  db('items', function(items) {
    items.findOne({ _id: ObjectID(req.params.id) }, function(err, item) {
      item.description = item.description.replace(/阅读全文/g, '');
      if (item.image.indexOf('zdmimg.com') >= 0) {
        item.image = "http://loremflickr.com/320/240/cute,animal";
      }

      res.render('result', {
        item: item,
      });
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

router.get('/:id/faved', function(req, res) {
  db('items', function(items) {
    items.findOne({ _id: ObjectID(req.params.id) }, function(err, item) {
      res.json(item.fav.indexOf(req.cookies.id) >= 0);
    });
  });
});

module.exports = router;
