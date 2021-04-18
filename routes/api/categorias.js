const express = require("express");
const router = express.Router();

const categoriaController = require('../../controllers/categoriaController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",auth.verificarVendedor,categoriaController.listar);

//.com/api/usuario/register
router.post("/add",auth.verificarVendedor,categoriaController.add);

//.com/api/usuario/update
router.patch("/update/:id",auth.verificarVendedor,categoriaController.update);

//.com/api/usuario/activate
router.patch("/activate/:id",auth.verificarVendedor,categoriaController.activate);

//.com/api/usuario/deactivate
router.patch("/deactivate/:id",auth.verificarVendedor,categoriaController.deactivate);

module.exports = router;