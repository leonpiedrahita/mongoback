const mongoose = require('mongoose');


const crearConexion = (dbName) => {
  const uri = 'mongodb+srv://node-shop:'+ process.env.MONGO_ATLAS_PW +'@primerproyecto.v3ebk.mongodb.net/'+dbName+'?retryWrites=true&w=majority';
  return mongoose.createConnection(uri, {
    
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
}


const obtenerConexion = (dbName) => {
  let [ conexion ] = mongoose.connections.filter(conn => conn.name === dbName);
  if(!conexion) {
    conexion = crearConexion(dbName);
  }
  return conexion;
}

module.exports = obtenerConexion;