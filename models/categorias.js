const mongoose = require('mongoose'); 

const categoriaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: Number, default: 1},
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports =categoriaSchema;

/* module.exports = mongoose.model('Categoria', categoriaSchema); */