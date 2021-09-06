const express = require("express");
const router = express.Router();

const reporteController = require('../../controllers/reporteController');
const reporteRegController = require('../../controllers/reporteRegController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",reporteController.listar);

//.com/api/usuario/register
router.post("/registrar",reporteController.registrar,reporteRegController.registrar);



//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/actualizar/:id",reporteController.actualizar);
router.get("/listaruno/:id",reporteController.listaruno);

module.exports = router;