const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Cliente } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');
const connbase1 = obtenerConexion('Primerproyecto');
const modelocliente = obtenerModelo('Cliente', Cliente, connbase1)



exports.listar = async (req, res, next) => {
  await modelocliente.find()
    .exec()
    .then(Clientes => {
      res.status(200).json(Clientes)
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
  await modelocliente.find({ nit: req.body.nit })
    .exec()
    .then(cliente => {
      if (cliente.length >= 1) {
        return res.status(409).json({
          message: 'Cliente existente'
        });
      } else {

        const cliente = new modelocliente({
          _id: new mongoose.Types.ObjectId(),
          nombre: req.body.nombre,
          nit: req.body.nit,
          contactoprincipal: req.body.contactoprincipal,
        });
        cliente
          .save()
          .then(result => {
            console.log(result);
            req.respuesta = 'Equipo creado'
            /* res.status(201).json({
              message: 'Equipo creado'
            }); */
            next()
/*             console.log(result);
            res.status(201).json({
              message: 'Cliente creado'
            }); */
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
            next(err);
          });


      }
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
exports.agregarsede = async (req, res, next) => {
  const id = req.params.id;
  await modelocliente.update({ _id: id }, {
    $push: {
      sede: {
        $each:
          [{ nombre: req.body.nombre, direccion: req.body.direccion, idcliente: id }]
      }
    }
  })
    .exec()
    .then(result => {
      console.log(result);
      req.respuesta = 'Sede Agregada'

      next()
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