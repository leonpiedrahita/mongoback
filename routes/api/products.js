const express = require("express");
const router = express.Router();
const {Product} = require('../../models');

router.get("/", (req, res, next) => {
    Product.find()
    .select('name price _id ')//si quiero excluir alguno de ellos, solo pongo los que no quiero con un menos antes
    .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              price: doc.price,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:3000/products/" + doc._id
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

  module.exports = router;