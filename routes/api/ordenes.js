const express = require("express");
const router = express.Router();

const ordenController = require('../../controllers/ordenController');
/* const clienteRegController = require('../../controllers/clienteRegController');
 */const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/usuario/listar
router.get("/listar",ordenController.listar);
//.com/api/usuario/registrar
router.post("/registrar",ordenController.registrar);
//.com/api/usuario/actualizar/id del elemento de la colección que quiero modificar
router.patch("/agregaretapa/:id",ordenController.agregaretapa);
/* router.patch("/actualizar/:id",clienteController.actualizar,clienteRegController.actualizar);
//.com/api/usuario/agregarsede/:id
router.patch("/agregarsede/:id",clienteController.agregarsede,clienteRegController.agregarsede);
//.com/api/usuario/agregarsede/:id
router.patch("/eliminarsede/",clienteController.eliminarsede,clienteRegController.eliminarsede); */

module.exports = router;