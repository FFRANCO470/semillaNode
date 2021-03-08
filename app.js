//para usar lod datos del archivo .env
import {} from 'dotenv/config.js'
import Server from './models/Server.js' //esta linea se escribe automaticamente

//importar servidor
const server = new Server();

//colocar a funcionar el servidor 
server.listen();