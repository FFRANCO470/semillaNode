import Usuario from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../middlewares/validarJwt.js';


const usuarioController={
    usuarioPost:async(req,res)=>{
        const {nombre,email,password,rol} = req.body;// recibir datos del cliente
        if(nombre.length>50){return res.status(400).json({msg:'Nombre mayour 50 caracteres'})}
        if(email.length>50){return res.status(400).json({msg:'Nombre mayour 50 caracteres'})}
        if(password.length>50){return res.status(400).json({msg:'Nombre mayour 50 caracteres'})}
        const usuario = Usuario({nombre,email,password,rol});//crear el usuario con datos recibidos
        const salt = bcryptjs.genSaltSync(2);//capas de encriptacion de password
        usuario.password = bcryptjs.hashSync(password,salt);//encriptacion de password
        await usuario.save();// guardar en base de datos
        res.json({usuario})//enviar al cliente el usuario creado
    },
    login:async(req,res)=>{
        const {email,password}=req.body;
        const usuario = await Usuario.findOne({email:email});//Buscar el correo
        if (!usuario) {return res.status(400).json({msg:'usuario/password no validos email'})}// verificar que exista el correo      
        if (usuario.estado === 0) {return res.status(400).json({msg:'usuario/password no validos estado'})}// verificar que este activo el usuario
        const validarPassword = bcryptjs.compareSync(password,usuario.password);//verificar que la contraseña sea valida
        if (!validarPassword) {return res.status(400).json({msg:'usuario/password no validos estado pass'})}
        const token = await generarJWT(usuario.id);//crear token encriptado del id de usuario
        res.json({usuario,token})//enviar al cliente el usuario y el token
    },
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
    usuarioPut:async(req,res)=>{
        const {id} = req.params;
        const{_id,createdAt,estado,__v,email,rol,password,...resto} = req.body;
        const user = await Usuario.findOne({_id:id})
        if (user.estado === 0) {return res.status(400).json({msg:'usuario desactivado estado'})}
        if (email && email!="") {resto.email = email}
        if (email && email.length > 50) {return res.status(400).json({msg:'Email mayor de 50 caracteres'})}
        console.log(rol);

        if (rol && rol !=="") {
            if (rol !== "ADMIN_ROL"  ) {
                if (rol !== "VENDEDOR_ROL") {
                    if (rol !== "ALMACENISTA_ROL") {
                        return res.status(400).json({msg:'No es un rol'})
                    } else {resto.rol = rol;}
                } else {resto.rol = rol;}
            }else{resto.rol = rol;}
        }
        if (password && password.length>64) {return res.status(400).json({msg:'Password mayor de 64 caracteres'})}
        if (password && password != "") {
            const salt = bcryptjs.genSaltSync(2);
            resto.password = bcryptjs.hashSync(password,salt);
        }
        if(Object.entries(resto).length==0){return res.status(400).json({msg:'No actualizo nada'})}
        if(resto.nombre==""){return res.status(400).json({msg:'Nombre vacio'})}
        if(resto.nombre.length > 50){return res.status(400).json({msg:'Nombre mayor de 50 caracteres'})}
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