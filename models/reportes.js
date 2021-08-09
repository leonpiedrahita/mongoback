const mongoose = require('mongoose');

const reporteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    numero: { type: Number, required: false },
    tipodeasistencia: { type: String, required: true },
    duracion: { type: String, required: true },
    fechadeinicio: { type: String, required: true },
    fechadefinalizacion: { type: String, required: true },
    infoequipo: { type: Object, required: true },
    propietario: { type: String, required: true },
    nombrecliente: { type: String, required: true },
    nitcliente: { type: String, required: true },
    sedecliente: { type: String, required: true },
    direccioncliente: { type: String, required: true },
    profesionalcliente: { type: String, required: true },
    telefonocliente: { type: String, required: true },
    hallazgos: { type: String, required: true },
    actividades: { type: String, required: true },
    pruebas: { type: String, required: true },
    repuestos: { type: String, required: true },
    observaciones: { type: String, required: true },
    firmacliente:{ type: String, required: true },
    firmaingeniero:{ type: String, required: true },
    ingeniero:{ type: String, required: true },

     
    //productImage: { type: String, required: false }
    
}, { timestamps: true });

module.exports = reporteSchema;
/* module.exports = mongoose.model('Reporte', reporteSchema); */