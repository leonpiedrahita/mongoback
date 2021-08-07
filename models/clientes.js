const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    nit: { type: String, required: true },
    sede: { type: Array, required: false },
    contactoprincipal: { type: Array, required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = clienteSchema;

/* module.exports = mongoose.model('Cliente', clienteSchema); */