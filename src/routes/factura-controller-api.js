const express = require('express')
const facturasController = require('../controllers/factura-controller-api')
const router = express.Router();

router.get('/api/facturas',facturasController.getFacturasPorId);
router.get('/api/facturas/:id',facturasController.getFacturasPorId);
router.delete('/api/facturas/:id', facturasController.deleteCategoriaPorId);
router.post('/api/facturas',facturasController.postFacturas);
router.put('/api/facturas/:id',facturasController.putFacturasPorId);

//Para poder usar otro router en otro archivo
module.exports=router;