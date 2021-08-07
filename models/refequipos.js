const mongoose = require('mongoose');

const refequipoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = refequipoSchema;

/* module.exports = mongoose.model('Equipo', equipoSchema); */