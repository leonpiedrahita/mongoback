const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Equipo, Cliente } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos


const tokenServices = require('../services/token');


exports.listar = async (req, res, next) => {
  await Equipo.find()
    /* .populate('propietario', 'nombre -_id') *///este sirve para decir cual quiero enviar y cual no
    .populate('propietario cliente')

    .then(equipo => {
      /* Cliente.populate(equipo,{path:"propietario"}) */
      /* Cliente.populate(equipo,{path:"propietario", select: 'nombre' }) */

      res.status(200).json(equipo);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.registrar = async (req, res, next) => {
  await Equipo.find({ serie: req.body.serie })
    .exec()
    .then(equipos => {
      if (equipos.length >= 1) {
        return res.status(409).json({
          message: 'Equipo existente'
        });
      } else {

        const equipo = new Equipo({
          _id: new mongoose.Types.ObjectId(),
          nombre: req.body.nombre,
          marca: req.body.marca,
          serie: req.body.serie,
          propietario: req.body.propietario,
          cliente: req.body.cliente,
        });
        equipo
          .save()
          .then(result => {
            console.log(result);
            res.status(201).json({
              message: 'Equipo creado'
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
  const ensayo = Object.keys(req.body);
  for (let i = 0; i < ensayo.length; i++) {
    updateOps[ensayo[i]] = Object.values(req.body)[i]
  }
  await Equipo.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Equipo Actualizado',
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

exports.buscar = async (req, res, next) => {

  await Equipo.find({ $and: [req.body.buscar] })
    .then(equipo => {
      Cliente.populate(equipo, { path: "propietario" })
        .then(equipos => {
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