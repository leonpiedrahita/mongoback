//Este es el manejador de los modelos
const mongoose = require("mongoose");
const User = require("./users");
const Product = require("./products");

mongoose.connect('mongodb+srv://node-shop:'+ process.env.MONGO_ATLAS_PW +'@primerproyecto.v3ebk.mongodb.net/Primerproyecto?retryWrites=true&w=majority', {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
mongoose.Promise = global.Promise;


module.exports = {
    User,
    Product

};