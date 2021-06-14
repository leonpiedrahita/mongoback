const mongoose = require('mongoose');

const clientelogSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    nit: { type: String, required: true },
    sede: { type: Array, required: true },
    contactoprincipal: { type: Array, required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = mongoose.model('Clientelog', clientelogSchema);