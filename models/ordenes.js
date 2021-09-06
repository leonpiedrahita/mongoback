const mongoose = require('mongoose');

const ordenSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    etapaactual: {type: String, required: true},
    ultimaetapa: {type: String, required: true},
    etapas: {type: Array, required: true},
    estado: {type: String, required:false},
    equipo: {type: mongoose.Schema.Types.ObjectId, ref: 'Equipo', required: true},
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports=ordenSchema;

/* module.exports = mongoose.model('Firma', firmaSchema); */