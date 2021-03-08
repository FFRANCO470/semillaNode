import express from 'express'
import cors from 'cors'
import dbConnection from '../database/config.js';
class Server{
    constructor(){
        //crear variable con el puerto
        this.port = process.env.PORT
        //crear servidor
        this.app = express();
        //conectar a base de datos
        this.conectarBD();
        //dar a conocer los middlewares
        this.middlewares();
        //rutas o routes
        this.routes();
    }
    routes(){    
        
    }
    async conectarBD(){
        //llamar base de datos
        await dbConnection();
    }
    middlewares(){
        //leer archivos js
        this.app.use(express.json());
        //valirdar origen de peticion
        this.app.use(cors());  
        //para mostrar el front end
        this.app.use(express.static('public'))
    }
    //mantener prendido el servidor
    listen(){
        this.app.listen(this.port, ()=>{
        console.log(`servidor corriendo ${this.port}`);
        });
    }
}
//exportar
export default Server