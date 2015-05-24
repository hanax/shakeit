var express = require('express');
var router = express.Router();

var db = require('../models/db');
var raccoon = require('../models/raccoon');

router.get('/jump', function(req, res) {
  raccoon.recommendFor(
    req.cookies.id, 3 /* numberOfRecs */, function(results) {
      console.log(arguments)
      if (results.length === 0) {
        // Read item from database and return
        db('items', function(items) {
          items.count(function(err, cnt) {
            var rand = Math.floor(Math.random() * cnt);

            //TODO: Make sure the item has not be faved before
            items.find().limit(-1).skip(rand).next(function(err, item) {
              res.json(item._id);
            });
          });
          
        });
      } else {
        res.json(results[0]);
      }
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XoX' }); 
});

module.exports = router;
