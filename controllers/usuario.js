import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
const usuarioController={
    //objeto para enviar todos los usuarios
    usuarioGet: async(req,res)=>{
        const valor = req.query.value;
        const usuarios = await Usuario.find({
            $or:[
                {nombre:new RegExp(valor,'i')},
                {email : new RegExp(valor,'i')},
                {rol : new RegExp(valor,'i')}
            ]
        });
        res.json({usuarios})
    },
    usuarioGetId: async(req,res)=>{
        const {id} = req.params;
        const usuario = await Usuario.findOne({_id:id});
        res.json({usuario})
    },
    // objeto para crear usuarios y enviarlos a la base de datos
    usuarioPost:async(req,res)=>{
        // recibir datos del cliente
        const {nombre,email,password,rol} = req.body;
        //asignar datos del cliente para creacion de usuario en base de datos
        const usuario = Usuario({nombre,email,password,rol});
        //para encriptar contraseña el numero es la cantidad de capas
        const salt = bcryptjs.genSaltSync(2);
        //encriptacion de contraseña
        usuario.password = bcryptjs.hashSync(password,salt);
        // guardar o enviar a la base de datos
        await usuario.save();
        res.json({usuario})
    },
    usuarioPut:async(req,res)=>{
        const {id} = req.params;
        const{_id,createdAt,estado,__v,email,rol,password,...resto} = req.body;
        if (password) {
            const salt = bcryptjs.genSaltSync(2);
            resto.password = bcryptjs.hashSync(password,salt);
        }
        const usuario = await Usuario.findByIdAndUpdate(id,resto);
        res.json({usuario})
    },
    usuarioPutActivar:async(req,res)=>{
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:1});
        res.json({usuario})
    },
    usuarioPutDesactivar:async(req,res)=>{
        const {id} = req.params;
        const usuario = await Usuario.findByIdAndUpdate(id,{estado:0});
        res.json({usuario})
    }
}
export default usuarioController