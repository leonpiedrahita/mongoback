const express = require("express");
const router = express.Router();

const clienteController = require('../../controllers/clienteController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",clienteController.listar);

//.com/api/usuario/register
router.post("/registrar",clienteController.registrar);



//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/actualizar/:id",clienteController.actualizar);

module.exports = router;