const express = require("express");
const router = express.Router();

const equipoController = require('../../controllers/equipoController');
const equipo2Controller = require('../../controllers/equipo2Controller');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar"/* ,auth.verificarAdministrador */,equipoController.listar ,equipo2Controller.listar);

//.com/api/usuario/register
router.post("/registrar",equipoController.registrar,equipo2Controller.registrar);



//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/actualizar/:id",equipoController.actualizar,equipo2Controller.actualizar);

router.get("/buscar",equipoController.buscar);

module.exports = router;