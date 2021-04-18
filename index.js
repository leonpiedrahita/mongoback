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

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
  
// Creo el primer gestor para que decete la ruta cuando se escriba /api
app.use("/api", apiRouter);

module.exports = app;
