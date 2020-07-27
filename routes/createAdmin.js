var mysql = require('mysql');
var express = require('express');
var router = express.Router();
var conn = require('../public/javascripts/connectDatabase');
/* GO home page. */
router.get('/', function (req, res, next) {
    if (req.session.userId) {
        res.render('createAdmin', {
            page: 'Admin Creation',
            menuId: 'createAdmin',
            error: ""
        });
    } else {
        res.redirect('signin');
    }

})

router.post('/', function (req, res, next) {


    var login = req.body.login;
    var password = req.body.password;
    // recover login and password from the form
    try {

        if (login != "" && password != "")
        // check if the login and the password are not empty
        {
            conn.query("INSERT INTO admin (login, password) VALUES ('" + login + "', PASSWORD('" + password + "'))", function (err, fields) {
                //Insert new admin
                if (err) throw err;

                res.redirect('manageAdmin');
                //Refresh the page 
            });


        } else {
            // if the login or the password is empty, the page refresh, and it's add an error message
            res.render('createAdmin', {
                page: 'Admin Creation',
                menuId: 'createAdmin',
                error: "Warning : Login or Password empty !"
            });
        }


    } catch (error) {
        res.redirect('createAdmin');
        console.log(error);

    }

})


module.exports = router;