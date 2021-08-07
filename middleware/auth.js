const tokenServices = require('../services/token');

module.exports = {
    verificarAdministrador:async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse === 'token vencido'){
                return res.status(403).send({
                    message: 'Token vencido'
                })
            }
            else if(validationResponse.rol === 'administrador'){
                next();//si es usuario es administrador, bien pueda
            }else{
                return res.status(403).send({
                    message: 'No autorizado'
                })
            }
        }
    },
    verificarVendedor:async (req, res, next) =>{
        if(!req.headers.token){
            return res.status(404).send({
                message: 'Token no encontrado'
            });
        }else{
            const validationResponse = await tokenServices.decode(req.headers.token);
            if(validationResponse.rol === 'administrador' || validationResponse.rol === 'vendedor'){
                next();//si es usuario es administrador, bien pueda
            }else{
                return res.status(403).send({
                    message: 'No autorizado'
                })
            }
        }
    }
}