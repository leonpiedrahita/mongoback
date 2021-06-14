const express = require("express");
const router = express.Router();

const articuloController = require('../../controllers/articuloController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/articulo/listar
router.get("/listar",articuloController.listar);

//.com/api/articulo/register
router.post("/add",auth.verificarVendedor,articuloController.add);

//.com/api/articulo/update
router.patch("/update/:id",auth.verificarVendedor,articuloController.update);

//.com/api/articulo/activate
router.patch("/activate/:id",auth.verificarVendedor,articuloController.activate);

//.com/api/articulo/deactivate
router.patch("/deactivate/:id",auth.verificarVendedor,articuloController.deactivate);

module.exports = router;