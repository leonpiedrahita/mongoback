const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, 
        required: true 
    },
    rol:{
        type: String,
    },
    estado:{
        type:Number,
        default:1
    }
    
}, { timestamps: true });

module.exports= usuarioSchema;
/* module.exports = mongoose.model('Usuario', usuarioSchema); */