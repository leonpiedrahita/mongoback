const mongoose = require("mongoose");



const { Categoria } = require('../models');//se debe llamar al modelo con el mismo nombre que se exporta
//en el index de modelos




exports.listar = async (req, res, next) => {
    await Categoria.find()
        .exec()
        .then(Categorias => {
            res.status(200).json(Categorias)
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
    await Categoria.find({ nombre: req.body.nombre })
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Categoria existente'
            });
        } else {
            const categoria = new Categoria({
                _id: new mongoose.Types.ObjectId(),
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
            });
            categoria
            .save()
            .then(result => {
                console.log(result);
                res.status(201).json({
                    message: 'Categoria creada',
                    categoria: result
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
    ////////lo comentado es si quiesiera actualizar todo
    
    // Categoria.findByIdAndUpdate(req.params.id, {//req.params.id busca en id en la url del sitio
    //     nombre: req.body.nombre, descripcion: req.body.descripcion
    // }, { new: true }).then((categoria) => {
    //     if (!categoria) {
    //         return res.status(404).send();
    //     }
    //     res.send(categoria);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })

    //Este es porque solo quiero actualizar lo que manden
    const id = req.params.id;
    const updateOps = {};
    const ensayo =Object.keys(req.body);
    for (let i = 0; i < ensayo.length; i++) {
        updateOps[ensayo[i]] = Object.values(req.body)[i]
        }
    await Categoria.update({ _id: id }, { $set: updateOps })
      .exec()
      .then(result => {
        res.status(200).json({
          message:'Categoria Actualizada',
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
    Categoria.findByIdAndUpdate(req.params.id, {//req.params.id busca en id en la url del sitio
        estado: 1,
    }, { new: true }).then((categoria) => {
        if (!categoria) {
            return res.status(404).send();
        }
        res.send(categoria);
    }).catch((error) => {
        res.status(500).send(error);
    })
}

exports.deactivate = async (req, res, next) => {
    Categoria.findByIdAndUpdate(req.params.id, {//req.params.id busca en id en la url del sitio
        estado: 0
    }, { new: true }).then((categoria) => {
        if (!categoria) {
            return res.status(404).send();
        }
        res.send(categoria);
    }).catch((error) => {
        res.status(500).send(error);
    })
}