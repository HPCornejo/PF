const bcrypt = require('bcryptjs');

function login(req, res){
    if(req.session.loggedin != true){
        res.render('login');
    }else{
        res.redirect('/categoria')
    }
    res.render('login');
}

function auth(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE name = ?', [data.name], (err, userdata) => {
            if (userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                        if (!isMatch) {
                            res.render('../../views/login', { error: 'Error: Contraseña incorrecta' });
                        } else {
                            
                            req.session.loggedin = true;
                            req.session.name = element.name;

                            res.redirect('/');
                        }
                    });
                });
            } else {
                res.render('login', { error: 'Error: Usuario no existente' });
            }
        });
    });
}


function registro(req, res){
    if(req.session.loggedin != true){
        res.render('login');
    }else{
        res.redirect('categoria')
    }
    res.render('registro');
}

function storeUser(req, res){
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users WHERE name = ?', [data.name], (err, userdata) => {
            if(userdata.lenght > 0) {
                res.render('../../views/registro', { error: 'Error: user already exist'});
            }else{
                bcrypt.hash(data.password, 12).then(hash => {
                data.password = hash;
        
                req.getConnection((err, conn) => {
                conn.query('INSERT INTO users SET ?', [data], (err, rows) => {
                res.redirect('/');
            })
        })
    });
            }
        })
    })
    

}

function logout(req, res){
    if(req.session.loggedin == true){
        req.session.destroy();
    }

    res.redirect('/login');
}

module.exports = {
    login,
    registro,
    storeUser,
    auth,
    logout

}