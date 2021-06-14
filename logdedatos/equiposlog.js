const mongoose = require('mongoose');

const equipologSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String, required: true },
    marca: { type: String, required: true },
    serie: { type: String, required: true },
    propietario: { type: mongoose.Schema.Types.ObjectId, ref: 'Clientelog', required: true },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Clientelog', required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = mongoose.model('Equipolog', equipologSchema);