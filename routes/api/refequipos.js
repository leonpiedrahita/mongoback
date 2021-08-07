const express = require("express");
const router = express.Router();

const refequipoController = require('../../controllers/refequipoController');
const refequipoRegController = require('../../controllers//refequipoRegController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar"/* ,auth.verificarAdministrador */,refequipoController.listar/*  ,equipo2Controller.listar */);

//.com/api/usuario/register
router.post("/registrar",refequipoController.registrar,refequipoRegController.registrar);



//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
/* router.patch("/actualizar/:id",equipoController.actualizar);

router.get("/buscar",equipoController.buscar); */

module.exports = router;