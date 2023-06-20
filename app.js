//rutas temporales
//advanced-table.html - Vista   
//modal.html - Referencia
//404.html - Vista
//input.html - Referencia
//assets public

const express = require('express')
const hbs = require('hbs')
const bodyParser = require('body-parser')
const cors = require('cors')
const puerto = process.env.PORT || 3000;

const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');

const app = express();

const loginRoutes = require('./src/routes/login-routes');

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials',()=>{});

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'siveo'
}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUnintialized: true
}));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials',()=>{});

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Rutas - temporales
app.get('/',(req,res)=>{
    if(req.session.loggedin == true){
        res.render('categoria', {name: req.session.name});
    }else{
        res.redirect('login')
    }
    
});

app.get('/ventas',(req,res)=>{
    res.render('ventas');
})

app.get('/clientes',(req,res)=>{
    res.render('clientes');
})

app.get('/proveedores',(req,res)=>{
    res.render('proveedores');
})

app.get('/factura',(req,res)=>{
    res.render('factura');
})

app.get('/productos',(req,res)=>{
    res.render('productos');
})

app.get('/categoria',(req,res)=>{
    res.render('categoria');
})

app.get('*',(req,res)=>{
    res.render('404');
})

app.listen(puerto,()=>{
    console.log('El servidor esta corriendo en el puerto', puerto);
})