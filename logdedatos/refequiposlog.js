const mongoose = require('mongoose');

const regequipologSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    insercion: { type: Object, required: true },
    tipodeinsercion: { type: Object, required: true },
    responsable: { type: String, required: true },
     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = regequipologSchema;