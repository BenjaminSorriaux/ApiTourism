var express = require('express');
var router = express.Router();

// Go to infos page
router.get('/', function(req, res, next) {
    res.render('infos', {page:'Infos', menuId:'infos'});
})

module.exports = router;