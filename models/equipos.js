const mongoose = require('mongoose');

const equipoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    serie: { type: String, required: true },
    propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = mongoose.model('Equipo', equipoSchema);