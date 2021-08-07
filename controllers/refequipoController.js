const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Refequipo} = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');

const tokenServices = require('../services/token');
const connbase1 = obtenerConexion('Primerproyecto');
const modelorefequipo = obtenerModelo('Refequipo',Refequipo, connbase1)


exports.listar = async (req, res, next) => {


  await modelorefequipo.find()


    .then(equipo => {
/*       modelocliente.populate(equipo,{path:"propietario"})
      modelocliente.populate(equipo,{path:"propietario", select: 'nombre' }) */
      
      res.status(200).json(equipo);
      next()

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.registrar = async (req, res, next) => {
  await modelorefequipo.find({ nombre: req.body.nombre })
    .exec()
    .then(equipos => {
      if (equipos.length >= 1) {
        return res.status(409).json({
          message: 'Equipo existente'
        });
      } else {

        const equipo = new modelorefequipo({
          _id: new mongoose.Types.ObjectId(),
          nombre: req.body.nombre,
          marca: req.body.marca,
        });
        equipo
          .save()
          .then(result => {
            console.log(result);
            req.respuesta = 'Equipo creado'
            /* res.status(201).json({
              message: 'Equipo creado'
            }); */
            next()
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

/* exports.actualizar = async (req, res, next) => {
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
}; */