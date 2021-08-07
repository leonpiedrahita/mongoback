const express = require("express");
const router = express.Router();

const firmaController = require('../../controllers/firmaController');
const auth = require('../../middleware/auth');

//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

//.com/api/firma/listar
router.get("/listar",auth.verificarAdministrador,firmaController.listar);

//.com/api/firma/registrar
router.post("/registrar",auth.verificarAdministrador,firmaController.registrar);
//.com/api/firma/buscar
router.get("/buscar",auth.verificarAdministrador,firmaController.buscar);



module.exports = router;