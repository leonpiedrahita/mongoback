const jwt = require('jsonwebtoken');

const { User } = require('../models');
const obtenerConexion = require('../conexiones/Factoriaconexion');
const obtenerModelo = require('../conexiones/FactoriaModelo');
const connbase1 = obtenerConexion('Primerproyecto');
const modelousuario = obtenerModelo('Usuario',User, connbase1)

const checkToken = async(token) =>{
    let localID =null;
    try{
        const {id} = await token.decode(token);
        localID = id;
    }catch{
        return false;
    }
    const user = await modelousuario.findOne({where:{
        _id : localID,
        estado: 1
    }});
    if(user){
        const token = encode(user);
        return token;
    }else{
        return false;
    }
}

module.exports = {
    encode: (user) => {
        const token = jwt.sign({
            id: user[0]._id,
            nombre: user[0].nombre,
            rol: user[0].rol,
            email: user[0].email,
            estado: user[0].estado
        },
            process.env.JWT_KEY,//llave secreta
            {
                expiresIn: "1800000"
            }
        )
        return token;
    },

    decode: async (token)=>{
        try{
            const {id,} = jwt.verify(token, process.env.JWT_KEY);
            
            const user = await modelousuario.findOne({
                _id : id,
                estado: 1
            })
            if(user){
                return user;
            }else {
                
                return false;
            }
        } catch(error){
            if(error.message === 'jwt expired'){
                return 'token vencido'
            };
            if(error.message !== 'jwt expired'){
                return false
            };
        }
    }
}