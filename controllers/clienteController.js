const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Cliente } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');


exports.listar = async (req, res, next) => {
  await Cliente.find()
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
  await Cliente.find({ nit: req.body.nit })
    .exec()
    .then(cliente => {
      if (cliente.length >= 1) {
        return res.status(409).json({
          message: 'Cliente existente'
        });
      } else {

        const cliente = new Cliente({          
          _id: new mongoose.Types.ObjectId(),
          nombre: req.body.nombre,
          nit: req.body.nit,
          sede: req.body.sede,
          contactoprincipal: req.body.contactoprincipal,
        });
        cliente
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'Cliente creado'
            });
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
    const ensayo =Object.keys(req.body);
    for (let i = 0; i < ensayo.length; i++) {
        updateOps[ensayo[i]] = Object.values(req.body)[i]
        }
    await Cliente.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message:'Cliente Actualizado',
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