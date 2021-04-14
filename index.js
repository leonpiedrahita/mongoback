const express = require("express"); // creo la instancia de express
const app = express(); // ya mi servidor web va a vivir dentro de app
const morgan = require("morgan");//Me imprime en la consola las respuestas de las peticiones a las rutas
const apiRouter = require('./routes/');
const bodyParser = require("body-parser");


app.use(bodyParser.json());

app.use(morgan("dev"));

app.use("/api", apiRouter);

module.exports = app;
