const express = require('express')
const proveedoresController = require('../controllers/proveedores-controller-api')
const router = express.Router();

router.get('/api/ventas',proveedoresController.getTodosProveedores);
router.get('/api/ventas/:id',proveedoresController.getProveedoresPorId);
router.delete('/api/ventas/:id', proveedoresController.deleteProveedoresPorId);
router.post('/api/ventas',proveedoresController.postProveedores);
router.put('/api/ventas/:id',proveedoresController.putProveedoresPorId);

//Para poder usar otro router en otro archivo
module.exports=router;