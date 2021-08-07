const mongoose = require('mongoose');

const firmaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    usuario: { type: String, required: true },
    firma: { type: String, required: true },
    
 
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports=firmaSchema;

/* module.exports = mongoose.model('Firma', firmaSchema); */