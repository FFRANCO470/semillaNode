import jwt from 'jsonwebtoken'
import { existeUsuarioById } from '../helpers/usuarios.js';
import Usuario from '../models/usuario.js';

const generarJWT = (uid='') =>{
    return new Promise((resolve,reject)=>{
        //console.log(uid);
        //checkToken()
        const payload = {uid}
        //crear la encriptacion primero es lo que se encripta y dos es lo que llave para encriptar
        jwt.sign(payload,process.env.SECREPRIVATEKEY,{
            //fecha de expiracion
            expiresIn:'7d'
        },(err,token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })  
    })
}
//VALIDAR Los id de categorias del token
const validarJWR = async (req,res,next) =>{
    //almacenar el token
    const token =  req.header('token')
    //si no hay token
    if (! token) {
        // 401 no autorizado
        return res.status(401).json({msg:'No hay token en la peticion'})
    }
    //capturar errores si hay token
    try {
        //verificar que el token sea correcto: decodificarlo
        const {uid} = jwt.verify(token,process.env.SECREPRIVATEKEY);
        //siendo decodificado ver si es valido
        const usuario = await Usuario.findById(uid) 
        if (!usuario) {
            //no existe usuario para ese token
            return res.status(401).json({msg:'No hay usuario para ese token'})
        }
        //verificacion del estado del usuario si existe
        if (usuario===0) {
            return res.status(401).json({msg:'Usuario con ese token esta desactivado'})
        }
        //para tener la info fuera de la aplicacion por que ya esta adentro
        req.usuario = usuario
        next()
    } catch (error) {
        //401 no autorizado
        return res.status(401).json({msg:'token no valido'})
    }
}
//chequear token
async function checkToken(token){
    let __id=null;
    try {
        //validar si token es correcto
        const {_id} = await jwt.decode(token);
        //si es correcto almacenarlo
        __id = _id 
    } catch (error) {
        return false;
    }
    //verificar si existe el usuario con el id decodificado
    const existeUsuario = existeUsuarioById(__id)
}
export {generarJWT,validarJWR}