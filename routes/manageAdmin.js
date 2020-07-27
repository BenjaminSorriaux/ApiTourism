var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var conn = require('../public/javascripts/connectDatabase');


/* GO home page. */
router.get('/', function (req, res, next) {
    var dataQuery;

    conn.query("SELECT id,login FROM admin", function (err, result, fields) {
        // recover all admins and send them to the page manageAdmin
        if (err) throw err;
        dataQuery = result;
        res.render('manageAdmin', {
            page: 'Admin Manage',
            menuId: 'manageAdmin',
            dataQuery
        });
    });
    if (!req.session.userId) {
        res.redirect('signin')
    }
})

router.post('/', function (req, res, next) {


    var id = req.body.id;
    var login = req.body.login;
    console.log(id);


    try {
        // delete the admin selected
        conn.query("DELETE FROM admin WHERE id = " + id + "", function (err, result, fields) {

            console.log(conn);
            if (err) throw err;
            dataQuery = result;


            res.redirect('manageAdmin')
        });


    } catch (error) {

        res.redirect('createAdmin');
        console.log(error);

    }

})
module.exports = router;