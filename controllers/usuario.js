import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../middlewares/validarJwt.js';


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
    login:async(req,res)=>{
        const {email,password}=req.body;
        const usuario = await Usuario.findOne({email:email});
        // verificar que exista el correo
        if (!usuario) {return res.json({msg:'usuario/password no validos email'})}
        // verificar que este activo el usuario
        if (usuario.estado === 0) {return res.json({msg:'usuario/password no validos estado'})}
        //verificar que la contraseña sea valida
        const validarPassword=bcryptjs.compareSync(password,usuario.password);
        if (!validarPassword) {return res.json({msg:'usuario/password no validos estado pass'})}
        //crear token encriptado del id de usuario
        const token = await generarJWT(usuario.id);
        res.json({usuario,token})
    },
    usuarioPut:async(req,res)=>{
        const {id} = req.params;
        const{_id,createdAt,estado,__v,email,rol,password,...resto} = req.body;

        const user = await Usuario.findOne({_id:id})
        if (user.estado === 0) {return res.json({msg:'usuario/password no validos estado'})}
        
        if (password) {
            const salt = bcryptjs.genSaltSync(2);
            resto.password = bcryptjs.hashSync(password,salt);
        }
        if (email) {resto.email = email;}
        
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