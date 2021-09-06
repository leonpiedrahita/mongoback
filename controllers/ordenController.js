const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Orden, Equipo, Cliente } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');
const connbase1 = obtenerConexion('Primerproyecto');
const modeloorden = obtenerModelo('Orden', Orden, connbase1)
const modeloequipo = obtenerModelo('Equipo', Equipo, connbase1)
const modelocliente = obtenerModelo('Cliente', Cliente, connbase1)



exports.listar = async (req, res, next) => {
  await modeloorden.find()
    .populate('equipo')
    .populate({ 
      path: 'equipo',
      populate: {
        path: 'cliente propietario'
      } 
   })
    
    .then(Ordenes => {
      res.status(200).json(Ordenes)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
      next(err);
    });
};

exports.registrar = async (req, res, next) => {

  const orden = new modeloorden({
    _id: new mongoose.Types.ObjectId(),
    etapaactual: 1,
    ultimaetapa: 1,
    etapas: req.body.etapas,
    equipo: req.body.equipo._id,
    estado: "Bloqueado"
  });
  orden
    .save()
    .then(result => {
      console.log(result);
      req.respuesta = 'Orden creada'
      /* res.status(201).json({
        message: 'Equipo creado'
      }); */
      /*   next() */

      res.status(201).json({
        result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
      next(err);
    });




};

exports.actualizar = async (req, res, next) => {
  const id = req.params.id;
  const updateOps = {};
  const ensayo = Object.keys(req.body);
  for (let i = 0; i < ensayo.length; i++) {
    updateOps[ensayo[i]] = Object.values(req.body)[i]
  }
  await modelocliente.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {

      /* message: 'Cliente Actualizado',
      articulo: result */
      console.log(result);
      req.respuesta = 'Cliente Actualizado'

      next()

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.agregaretapa = async (req, res, next) => {
  const id = req.params.id;
  await modeloorden.update({ _id: id }, {
    $push: {
      etapas: {
        $each:
          [{
            nombre: req.body.nombre, 
            comentario: req.body.comentario,
            responsable: req.body.responsable,
            hora:req.body.hora
          }]
      }
    },etapaactual: req.body.etapaactual,
    ultimaetapa: req.body.ultimaetapa,
    estado:req.body.estado
  }
  )
    .exec()
    .then(result => {
      console.log(result);
      req.respuesta = 'Sede Agregada'
      res.status(200).json(result);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
exports.eliminarsede = async (req, res, next) => {

  await modelocliente.update({ _id: req.body.idcliente }, { $pull: { sede: { nombre: req.body.nombre } } })
    .exec()
    .then(result => {
      console.log(result);
      req.respuesta = 'Sede Eliminada'

      next()
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}