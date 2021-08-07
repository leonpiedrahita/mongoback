//Este es el manejador de los modelos
const mongoose = require("mongoose");

//Importo los modelos
const Userlog = require("./userslog");
const Articulolog = require("./atriculoslog");
const Categorialog = require("./categoriaslog");
const Clientelog = require("./clienteslog");
const Equipolog = require("./equiposlog");
const Refequipolog = require("./refequiposlog");
const Reportelog = require("./reporteslog");
//Creo la conexión con Mongo


//Exporto los modelos
module.exports = {
    Userlog,
    Articulolog,
    Categorialog,
    Clientelog,
    Equipolog,
    Refequipolog,
    Reportelog,

};