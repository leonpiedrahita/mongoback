//Manejador de rutas
const express = require("express");
const router = express.Router();
const usersRouter = require('./api/users');
const productsRouter = require('./api/products');

router.use("/users", usersRouter);
router.use("/products", productsRouter);





module.exports = router;