const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { User } = require('../../models');



//Hasta este punto ya vamos en api/usuario ya comenzamos a
// manejar los metodos

router.get("/", async(req, res, next) => {
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
    });
})

router.post("/register", async(req, res, next) => {
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
                });
            }
          });
        }
    });
  })


module.exports = router;