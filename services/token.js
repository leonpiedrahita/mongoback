const jwt = require('jsonwebtoken');
const { User } = require('../models');

const checkToken = async(token) =>{
    let localID =null;
    try{
        const {id} = await token.decode(token);
        localID = id;
    }catch{
        return false;
    }
    const user = await User.findOne({where:{
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
                expiresIn: "1h"
            }
        )
        return token;
    },

    decode: async (token)=>{
        try{
            const {id,} = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({
                _id : id,
                estado: 1
            })
            if(user){
                return user;
            }else {
                return false;
            }
        } catch(error){
            const newToken = await checkToken(token);//llamo a la funcion creada checktoken para ver si fue que se vencio
            //el token o si es que hay un impostor
            return newToken;
        }
    }
}