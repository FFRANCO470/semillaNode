import jwt from 'jsonwebtoken'
import { existeUsuarioById } from '../helpers/usuarios.js';
import Usuario from '../models/usuario.js';

const generarJWT = (uid='') =>{
    return new Promise((resolve,reject)=>{
        //console.log(uid);
        const payload = {uid}//checkToken(token)
        //crear la encriptacion primero es lo que se encripta y dos es lo que llave para encriptar
        jwt.sign(payload,process.env.SECREPRIVATEKEY,{
            expiresIn:'7d'//fecha de expiracion
        },(err,token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })  
    })
}
//Validar Los id que vienen en el token 
const validarJWR = async (req,res,next) =>{
    const token =  req.header('token')//almacenar el token
    if (! token) {return res.status(401).json({msg:'No hay token en la peticion'})}// 401 no autorizado //verificar que halla token
    //capturar errores si hay token
    try {
        const {uid} = jwt.verify(token,process.env.SECREPRIVATEKEY);// decodifiacr token
        const usuario = await Usuario.findById(uid) //existe usuario con ese id
        if (!usuario) {return res.status(401).json({msg:'No hay usuario para ese token'})}//no existe usuario para ese token
        if (usuario.estado===0) {return res.status(401).json({msg:'Usuario con ese token esta desactivado'})}//verificacion del estado del usuario si existe
        req.usuario = usuario//para tener la info fuera de la aplicacion por que ya esta adentro
        next()
    } catch (error) {
        return res.status(401).json({msg:'token no valido'})//401 no autorizado
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