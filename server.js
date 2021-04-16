const http = require('http');
const app = require('./index');

//definimos una variable port donde traemos 
//el puerto del environment y si no tiene ninguna le asigna el puerto 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port,()=>{
    console.log('Servidor iniciado')
});