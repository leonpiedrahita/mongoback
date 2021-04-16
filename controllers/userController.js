const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const { User } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos



exports.listar =  async(req, res, next) => {
    await User.find()
    .exec()
    .then(Usuarios => {
            res.status(200).json(Usuarios)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
        next(err);
    });
};

exports.registrar =  async(req, res, next) => {
    await User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          return res.status(409).json({
            message: 'Email existente'
          });
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {//Encriptamos la contraseña
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                nombre: req.body.nombre,
                email: req.body.email,
                password: hash,
                rol: req.body.rol
              });
              user 
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                    message: 'Usuario creado'
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
        }
    });
};

exports.login = async(req, res, next) => {
    await User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Falló la autenticación'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Falló la autenticación'
                    });
                }
                if (result) {
                    //generamos el token
                  const token = jwt.sign({
                    id: user[0]._id,
                    nombre : user[0].nombre,
                    rol: user[0].rol,
                    email: user[0].email
                  }, 
                  process.env.JWT_KEY,//llave secreta
                  {
                    expiresIn: "1h"
                  }
                   )
                    return res.status(200).json({
                        message: 'Autenticación exitosa',
                        tokenReturn: token
                    });
                }
                res.status(401).json({
                    message: 'Falló la autenticación'
                    
                });
            })
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
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    }).catch((error) => {
        res.status(500).send(error);
    })
}