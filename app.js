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

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials',()=>{});

//Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Rutas - temporales
app.get('/',(req,res)=>{
    res.render('dashboard');
})

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