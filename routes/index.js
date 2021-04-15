//Manejador de rutas

const express = require("express");
const router = express.Router();

//Importo las rutas
const userRouter = require('./api/users');
const productsRouter = require('./api/products');



//Asocio el siguiente slash a api
//Queda así
router.use("/usuario", userRouter); //api/usuario
router.use("/products", productsRouter);//api/products





module.exports = router;