const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Reportelog} = require('../logdedatos');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');

const tokenServices = require('../services/token');
const connbase2 = obtenerConexion('logdedatos');
const modeloreportelog = obtenerModelo('Reportelog', Reportelog, connbase2)

exports.registrar = async (req, res, next) => {

  const validationResponse = await tokenServices.decode(req.headers.token);

  const equipo = new modeloreportelog({
    _id: new mongoose.Types.ObjectId(),
    insercion: req.body,
    tipodeinsercion: 'Registro',
    responsable: validationResponse._id


    /*           propietario: req.body.propietario,
              cliente: req.body.cliente, */
  });
  await equipo.save()
    .then(result => {
      console.log(result);
      console.log(req.respuesta + "Movimiento registrado");
      res.status(201).json({
        message: 'Equipo creado',
        identificacion: req.idcreada
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