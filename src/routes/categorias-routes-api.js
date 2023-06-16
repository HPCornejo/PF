const express = require('express')
const categoriasController = require('../controllers/categorias-controller-api')
const router = express.Router();

router.get('/api/categorias',categoriasController.getTodasCategorias);
router.get('/api/categorias/:id',categoriasController.getCategoriaPorNombre);
router.delete('/api/categorias/:id', categoriasController.deleteCategoriaPorNombre);
router.post('/api/categorias',categoriasController.postCategoria);
router.put('/api/categorias/:id',categoriasController.putCategoriaPorNombre);

//Para poder usar otro router en otro archivo
module.exports=router;
