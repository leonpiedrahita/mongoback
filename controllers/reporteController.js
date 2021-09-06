const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Reporte, Equipo} = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');
const connbase1 = obtenerConexion('Primerproyecto');
const modeloreporte = obtenerModelo('Reporte', Reporte, connbase1)
const modeloequipo = obtenerModelo('Equipo', Equipo, connbase1)


exports.listar = async (req, res, next) => {
  await modeloreporte.find()
  .then(reporte =>{
  
        res.status(200).json(reporte);

})
.catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });   
};
exports.listaruno = async (req, res, next) => {
  const id =req.params.id 
  await modeloreporte.find({ _id:id})
    .exec()
    .then(reporte => {
      
      if (reporte.length >= 1) {
        
            res.status(200).json(reporte[0]);
    
    
        
        
      } else {
        res.json("nada")

      }
      
    });
 
};

exports.registrar = async (req, res, next) => {
  await modeloreporte.count()
    .exec()
    .then(contador => {     

        const reporte = new modeloreporte({          
          _id: new mongoose.Types.ObjectId(),
          numero: contador+1,
          tipodeasistencia: req.body.reporte.tipodeasistencia,
          duracion:  req.body.reporte.duracion,
          fechadeinicio:  req.body.reporte.fechadeinicio,
          fechadefinalizacion:  req.body.reporte.fechadefinalizacion,
          infoequipo: req.body.reporte.infoequipo,
          propietario:  req.body.reporte.propietario,
          nombrecliente:  req.body.reporte.nombrecliente,
          nitcliente:  req.body.reporte.nitcliente,
          sedecliente:  req.body.reporte.sedecliente,
          direccioncliente:  req.body.reporte.direccioncliente,
          profesionalcliente:  req.body.reporte.profesionalcliente,
          telefonocliente:  req.body.reporte.telefonocliente,
          hallazgos:  req.body.reporte.hallazgos,
          actividades:  req.body.reporte.actividades,
          pruebas:  req.body.reporte.pruebas,
          repuestos:  req.body.reporte.repuestos,
          observaciones:  req.body.reporte.observaciones,
          firmacliente:  req.body.reporte.firmacliente,
          firmaingeniero:  req.body.reporte.firmaingeniero,
          ingeniero:  req.body.reporte.ingeniero,
        });
        reporte
          .save()
          .then(result => {
            console.log(result);
            req.respuesta='Reporte creado'
            req.idcreada=result._id
            next()
           /*  res.status(201).json({
              message: 'Reporte creado'
            }); */
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
            next(err);
          });


      
    });
};

exports.actualizar = async (req, res, next) => {
  const id = req.params.id;
    const updateOps = {};
    const ensayo =Object.keys(req.body);
    for (let i = 0; i < ensayo.length; i++) {
        updateOps[ensayo[i]] = Object.values(req.body)[i]
        }
    await Equipo.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message:'Equipo Actualizado',
          articulo: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
}