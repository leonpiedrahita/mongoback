const express = require("express");
const router = express.Router();

const userController = require('../../controllers/userController');


//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",userController.listar);

//.com/api/usuario/register
router.post("/registrar",userController.registrar);

//.com/api/usuario/login
router.post("/login",userController.login);

//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/actualizar/:id",userController.actualizar);
module.exports = router;