const express = require("express");
const router = express.Router();

const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",auth.verificarVendedor,userController.listar);

//.com/api/usuario/register
router.post("/registrar",auth.verificarAdministrador,userController.registrar);

//.com/api/usuario/ingresar
router.post("/ingresar",userController.ingresar);

//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/actualizar/:id",auth.verificarAdministrador,userController.actualizar);
module.exports = router;