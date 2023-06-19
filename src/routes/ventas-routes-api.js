const express = require('express')
const ventasController = require('../controllers/ventas-controller-api')
const router = express.Router();

router.get('/api/ventas',ventasController.getTodasVentas);
router.get('/api/ventas/:id',ventasController.getVentasPorId);
router.delete('/api/ventas/:id', ventasController.deleteventasPorId);
router.post('/api/ventas',ventasController.postventas);
router.put('/api/ventas/:id',ventasController.putventasPorId);

//Para poder usar otro router en otro archivo
module.exports=router;