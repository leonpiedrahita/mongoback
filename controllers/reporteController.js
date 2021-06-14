const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Reporte, Equipo} = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');


exports.listar = async (req, res, next) => {
  await Reporte.find()
  .then(reporte =>{
    Equipo.populate(reporte,{path:"infoequipo"})
    .then(equipos=>{
        res.status(200).json(equipos);


    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
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
  await Reporte.find({ _id:id})
    .exec()
    .then(reporte => {
      
      if (reporte.length >= 1) {
        Equipo.populate(reporte,{path:"infoequipo"})
        .then(equipos=>{
            res.status(200).json(equipos[0]);
    
    
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      } else {
        res.json("nada")

      }
    });
};

exports.registrar = async (req, res, next) => {
  await Reporte.count()
    .exec()
    .then(contador => {     

        const reporte = new Reporte({          
          _id: new mongoose.Types.ObjectId(),
          numero: contador+1,
          tipodeasistencia: req.body.tipodeasistencia,
          duracion:  req.body.duracion,
          fechadeinicio:  req.body.fechadeinicio,
          fechadefinalizacion:  req.body.fechadefinalizacion,
          infoequipo: req.body.infoequipo,
          propietario:  req.body.propietario,
          nombrecliente:  req.body.nombrecliente,
          nitcliente:  req.body.nitcliente,
          sedecliente:  req.body.sedecliente,
          direccioncliente:  req.body.direccioncliente,
          profesionalcliente:  req.body.profesionalcliente,
          telefonocliente:  req.body.telefonocliente,
          hallazgos:  req.body.hallazgos,
          actividades:  req.body.actividades,
          pruebas:  req.body.pruebas,
          repuestos:  req.body.repuestos,
          observaciones:  req.body.observaciones,
          firmacliente:  req.body.firmacliente,
          ingeniero:  req.body.ingeniero,
        });
        reporte
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'Reporte creado'
            });
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