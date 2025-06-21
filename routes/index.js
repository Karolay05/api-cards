const express = require('express');
const router = express.Router();
const { comprar } = require('../controllers/compraController');
const { registrarTarjeta } = require('../controllers/registroController');

router.post('/comprar', comprar);
router.post('/registrar-tarjeta', registrarTarjeta);

module.exports = router;
