//Manejador de rutas

const express = require("express");
const router = express.Router();

//Importo las rutas
const userRouter = require('./api/users');
const articuloRouter = require('./api/articulos');
const categoriaRouter = require('./api/categorias');



//Asocio el siguiente slash a api
//Queda así
router.use("/usuario", userRouter); //api/usuario
router.use("/articulo", articuloRouter);//api/articulo
router.use("/categoria", categoriaRouter);//api/categoria




module.exports = router;