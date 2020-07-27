'use strict';

var mysql = require('mysql');
var logger = require('./logger');

try {
    // Prepare the connection
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'web3'
    });

    // Make the connection
    conn.connect(function (err) {
        logger.info("Now connected to the database!");
    });

} catch (error) {
    throw error;
}

module.exports = conn;