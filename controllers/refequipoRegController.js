const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");




const { Refequipolog} = require('../logdedatos');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');

const tokenServices = require('../services/token');
const connbase2 = obtenerConexion('logdedatos');
const modelorefequipolog = obtenerModelo('Refequipolog', Refequipolog, connbase2)



exports.listar = async (req, res, next) => {


  await modeloequipolog.find()
    /* .populate('propietario', 'nombre -_id') *///este sirve para decir cual quiero enviar y cual no
    //.populate('propietario cliente')

    .then(equipo => {
      /* Cliente.populate(equipo,{path:"propietario"}) */
      /* Cliente.populate(equipo,{path:"propietario", select: 'nombre' }) */

      console.log(equipo)
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

  const validationResponse = await tokenServices.decode(req.headers.token);

  const equipo = new modelorefequipolog({
    _id: new mongoose.Types.ObjectId(),
    insercion: req.body,
    tipodeinsercion: 'Registro',
    responsable: validationResponse.id


    /*           propietario: req.body.propietario,
              cliente: req.body.cliente, */
  });
  await equipo.save()
    .then(result => {
      console.log(result);
      console.log(req.respuesta + "Movimiento registrado");
      res.status(201).json({
        message: 'Equipo creado'
      });
      next();


    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
      next(err);
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