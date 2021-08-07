const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const { Clientelog } = require('../logdedatos');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos

const tokenServices = require('../services/token');
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');
const connbase2 = obtenerConexion('logdedatos');
const modeloclientelog = obtenerModelo('Clientelog', Clientelog, connbase2)





exports.registrar = async (req, res, next) => {
  const validationResponse = await tokenServices.decode(req.headers.token);
  console.log(validationResponse)
  const cliente = new modeloclientelog({
    _id: new mongoose.Types.ObjectId(),
    insercion: req.body,
    tipodeinsercion: 'Registro',
    responsable: validationResponse.id
  });
  await cliente.save()
    .then(result => {
      console.log(result);
      console.log(req.respuesta + "Movimiento registrado");
      res.status(201).json({
        message: 'Movimiento Registrado'
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

exports.actualizar = async (req, res, next) => {
  const id = req.params.id;
  const validationResponse = await tokenServices.decode(req.headers.token);
  console.log(validationResponse)
  const cliente = new modeloclientelog({
    _id: new mongoose.Types.ObjectId(),
    insercion: req.body,
    tipodeinsercion: id +' ' +'Actualizado',
    responsable: validationResponse.id
  });
  await cliente.save()
    .then(result => {
      console.log(result);
      console.log(req.respuesta + "Movimiento registrado");
      res.status(201).json({
        message: 'Cliente Actualizado'
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
}
exports.agregarsede = async (req, res, next) => {
  const id = req.params.id;
  const validationResponse = await tokenServices.decode(req.headers.token);
  console.log(validationResponse)
  const cliente = new modeloclientelog({
    _id: new mongoose.Types.ObjectId(),
    insercion: req.body,
    tipodeinsercion: id +' ' +'Sede Agregada',
    responsable: validationResponse.id
  });
  await cliente.save()
  .then(result => {
    console.log(result);
    console.log(req.respuesta + "Movimiento registrado");
    res.status(201).json({
      message: 'Sede Agregada'
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
}
exports.eliminarsede = async (req, res, next) => {

  const id = req.params.id;
  const validationResponse = await tokenServices.decode(req.headers.token);
  console.log(validationResponse)
  const cliente = new modeloclientelog({
    _id: new mongoose.Types.ObjectId(),
    insercion: req.body,
    tipodeinsercion: req.body.idcliente +' ' +'Sede Eliminada',
    responsable: validationResponse.id
  });
  await cliente.save()
  .then(result => {
    console.log(result);
    console.log(req.respuesta + "Movimiento registrado");
    res.status(201).json({
      message: 'Sede Eliminada'
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
}