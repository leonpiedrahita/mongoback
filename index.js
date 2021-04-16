const express = require("express"); // creo la instancia de express
const app = express(); // ya mi servidor web va a vivir dentro de app
const morgan = require("morgan");//Me imprime en la consola las respuestas de las peticiones a las rutas
const bodyParser = require("body-parser");//Permite que express pueda recibir diferentes formatos de datos
const cors = require("cors");

const apiRouter = require('./routes/');//Importo el index donde están las rutas
app.use(cors());
app.use(bodyParser.json());// esto es para que express lea formatos Json
app.use(bodyParser.urlencoded({extended: true}));//esto es para leer este tipo 

app.use(morgan("dev"));

// Creo el primer gestor para que decete la ruta cuando se escriba /api
app.use("/api", apiRouter);

module.exports = app;
