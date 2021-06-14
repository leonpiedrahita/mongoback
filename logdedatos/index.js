//Este es el manejador de los modelos
const mongoose = require("mongoose");

//Importo los modelos
const Userlog = require("./userslog");
const Articulolog = require("./atriculoslog");
const Categorialog = require("./categoriaslog");
const Clientelog = require("./clienteslog");
const Equipolog = require("./equiposlog");
const Reportelog = require("./reporteslog");
//Creo la conexión con Mongo
mongoose.createConnection('mongodb+srv://node-shop:'+ process.env.MONGO_ATLAS_PW +'@primerproyecto.v3ebk.mongodb.net/logdedatos?retryWrites=true&w=majority', {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;


//Exporto los modelos
module.exports = {
    Userlog,
    Articulolog,
    Categorialog,
    Clientelog,
    Equipolog,
    Reportelog,

};