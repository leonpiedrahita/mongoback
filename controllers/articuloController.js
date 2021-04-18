const mongoose = require("mongoose");



const { Articulo } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos




exports.listar = async (req, res, next) => {
    await Articulo.find()
        .exec()
        .then(Articulos => {
            res.status(200).json(Articulos)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
            next(err);
        });
};

exports.add = async (req, res, next) => {
    await Articulo.find({ nombre: req.body.nombre })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Articulo existente'
            });
        } else {
            const articulo = new Articulo({
                _id: new mongoose.Types.ObjectId(),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                codigo: req.body.codigo
            });
            articulo
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Articulo creado',
                    articulo: result
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

exports.update = async (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    const ensayo =Object.keys(req.body);
    for (let i = 0; i < ensayo.length; i++) {
        updateOps[ensayo[i]] = Object.values(req.body)[i]
        }
    await Articulo.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message:'Articulo Actualizado',
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

exports.activate = async (req, res, next) => {
    Articulo.findByIdAndUpdate(req.params.id, {//req.params.id busca en id en la url del sitio
        estado: 1,
    }, { new: true }).then((articulo) => {
        if (!articulo) {
            return res.status(404).send();
        }
        res.send(articulo);
    }).catch((error) => {
        res.status(500).send(error);
    })
}

exports.deactivate = async (req, res, next) => {
    Articulo.findByIdAndUpdate(req.params.id, {//req.params.id busca en id en la url del sitio
        estado: 0
    }, { new: true }).then((articulo) => {
        if (!articulo) {
            return res.status(404).send();
        }
        res.send(articulo);
    }).catch((error) => {
        res.status(500).send(error);
    })
}