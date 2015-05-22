var express = require('express');
var router = express.Router();

var db = require('../models/db');

router.get('/jump', function(req, res) { 
  // Read item from database and return
  db('items', function(items) {
    items.count(function(err, cnt) {

      var rand = Math.floor(Math.random() * cnt);
      console.log(rand);

      //TODO: Make sure the item has not be faved before
      items.find().limit(-1).skip(rand).next(function(err, item) {
        res.json(item);
      });
    });
    
  });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'XoX' }); 
});

router.get('/fav_list.html', function(req, res, next) { 
  res.render('fav_list', { title: 'XoX' });
});

module.exports = router;
