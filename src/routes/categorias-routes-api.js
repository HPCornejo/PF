const express = require('express');
const categoriasController = require('../controllers/categorias-controller-api');
const router = express.Router();

router.get('/api/categorias',categoriasController.getTodasCategorias);

module.exports=router;