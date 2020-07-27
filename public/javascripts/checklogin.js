var login = req.body.login;
var password = req.body.password;


try {
    // Create the connection
    var con = mysql.createConnection({
        host: '127.0.0.1:3306',
        user: 'root',
        password: '',
        database: 'webproject'
    });

    // Make the connection
    con.connect(function (err) {
        logger.info("Now connected to the database!");
    });

    if (login != null && password != null) {
        con.query('SELECT * FROM admin WHERE login = ? AND password = ?'), [login, password], (err, rows) => {
            if (rows != 0) {
                res.render('admin', {
                    page: 'Admin',
                    menuId: 'admin'
                });
            }

        }
    }


} catch (error) {
    res.render('signin', {
        page: 'Sign-in',
        menuId: 'signin'
    });
}