const express = require("express");
const router = express.Router();

const equipoController = require('../../controllers/equipoController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",equipoController.listar);

//.com/api/usuario/register
router.post("/registrar",equipoController.registrar);



//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/actualizar/:id",equipoController.actualizar);

router.get("/buscar",equipoController.buscar);

module.exports = router;