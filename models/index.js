//Este es el manejador de los modelos
const mongoose = require("mongoose");

//Importo los modelos
const User = require("./users");
const Product = require("./products");

//Creo la conexión con Mongo
mongoose.connect('mongodb+srv://node-shop:'+ process.env.MONGO_ATLAS_PW +'@primerproyecto.v3ebk.mongodb.net/Primerproyecto?retryWrites=true&w=majority', {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;


//Exporto los modelos
module.exports = {
    User,
    Product

};