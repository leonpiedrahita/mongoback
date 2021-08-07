const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Firma } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');
const connbase1 = obtenerConexion('Primerproyecto');
const modelofirma = obtenerModelo('Firma', Firma, connbase1)

exports.listar = async (req, res, next) => {
  await modelofirma.find()
    .exec()
    .then(Firmas => {
      res.status(200).json(Firmas)
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
  const validationResponse = await tokenServices.decode(req.headers.token);
  await modelofirma.find({ usuario: validationResponse._id })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'Firma Existente'
        });
      } else {

        const user = new modelofirma({
          _id: new mongoose.Types.ObjectId(),
          usuario: validationResponse._id,
          firma: req.body.firma,

        });
        user
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'Firma Registrada'
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
exports.buscar = async (req, res, next) => {
  const validationResponse = await tokenServices.decode(req.headers.token);
  await modelofirma.find({ usuario: validationResponse._id })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(200).json(user);
      } else {
        res.status(201).json({
          message: 'Firma No Registrada'
        });
      }
    })
    .catch (err => {
    console.log(err);
    res.status(500).json({
      error: err
    });

  });


};

