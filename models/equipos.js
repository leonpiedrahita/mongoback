const mongoose = require('mongoose');

const equipoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    serie: { type: String, required: true },
    propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    ubicacionnombre:{ type: String, required: true },
    ubicaciondireccion:{ type: String, required: true },
    estado:{ type: String, required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = equipoSchema;

/* module.exports = mongoose.model('Equipo', equipoSchema); */