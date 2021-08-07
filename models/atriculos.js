const mongoose = require('mongoose');

const articuloSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    codigo: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: Number, default: 1 },
    categoriaId: { type: String, required: true },
 
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports=articuloSchema;

/* module.exports = mongoose.model('Articulo', articuloSchema); */