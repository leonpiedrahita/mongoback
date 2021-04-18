const express = require("express");
const router = express.Router();

const articuloController = require('../../controllers/articuloController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",auth.verificarVendedor,articuloController.listar);

//.com/api/usuario/register
router.post("/add",auth.verificarVendedor,articuloController.add);

//.com/api/usuario/update
router.patch("/update/:id",auth.verificarVendedor,articuloController.update);

//.com/api/usuario/activate
router.patch("/activate/:id",auth.verificarVendedor,articuloController.activate);

//.com/api/usuario/deactivate
router.patch("/deactivate/:id",auth.verificarVendedor,articuloController.deactivate);

module.exports = router;