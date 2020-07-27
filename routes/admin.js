var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const PageArray = new Array();
var conn = require('../public/javascripts/connectDatabase');

router.get('/', function (req, res, next) {
    // If a session already exists
    if (req.session.userId) {
        conn.query('SELECT * FROM pagetable',function (err,result) {
           
            res.render('admin', {
                page: 'Admin',
                menuId: 'admin',
                result
            });
        });
        // Go to the admin page
      
    }
    else{
        // Go to the signin page
        res.redirect('/signin');
    }
})

router.post('/', function (req, res, next) {
    try {
       
        // Request to check login and password
        conn.query('SELECT id FROM admin WHERE login = ? AND password = PASSWORD(?)', [req.body.login, req.body.password], function (err, result) {
            if (err) throw err;
            console.log(result);
            // If we got a result
            if (result.length > 0) {
                req.session.userId = result[0].id;              
              
            } else {
                // Redirect to signin page
                res.redirect('/signin');
            }
        })

        conn.query('SELECT * FROM pagetable',function (err,result) {
            res.render('admin', {
                page: 'Admin',
                menuId: 'admin',
                result
            });
        })



    } catch (error) {
        res.redirect('/signin');
        console.log(error);
    }
})

module.exports = router;