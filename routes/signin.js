var express = require('express');
var router = express.Router();

// Go to the sign-in page manually with GET method
router.get('/', function(req, res, next) {
    res.render('signin', {page:'Sign-in', menuId:'signin'});
})

module.exports = router;