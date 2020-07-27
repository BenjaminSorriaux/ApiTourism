var express = require('express');
var router = express.Router();

// Go home page
router.get('/', function (req, res, next) {
  res.render('index', {
    page: 'Home',
    menuId: 'home'
  });
});

module.exports = router;