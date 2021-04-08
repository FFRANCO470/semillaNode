import express from 'express'
import cors from 'cors'
import dbConnection from '../database/config.js';
import categoria from '../routes/categoria.js';
import usuario from '../routes/usuario.js'
import articulo from '../routes/articulo.js'
import persona from '../routes/persona.js'
import compra from '../routes/compra.js'
import venta from '../routes/venta.js'
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
        this.app.use('/api/categoria',categoria);
        this.app.use('/api/usuario',usuario);
        this.app.use('/api/articulo',articulo);
        this.app.use('/api/persona',persona);
        this.app.use('/api/compra',compra)
        this.app.use('/api/venta',venta)
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