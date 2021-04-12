import Usuario from '../models/usuario.js'
//validar si existe usuario con el id del token ya desencriptado
const existeUsuarioById = async (id)=>{
    const existe = await Usuario.findById(id)
    if (!existe) {throw new Error(`Usuario con ID no existe`)}
}
const existeUsuarioByName = async (nombre)=>{
    const existe = await Usuario.findOne({nombre})
    if (existe) {throw new Error('Nombre ya existente')}
}
const contarUsuarioNombre = (nombre)=>{
    if (nombre.length>50){throw new Error('Nombre mayor de 50 caracteres')}
}
const existeUsuarioByEmail = async (email) =>{
    const existe = await Usuario.findOne({email})
    if(existe) throw new Error('Email ya existe')
}
const existeUsuarioByRol = async (rol) =>{
    if (rol != "ADMIN_ROL")  {
        if (rol != "VENDEDOR_ROL") {
            if (rol != "ALMACENISTA_ROL") {
                throw new Error(`No existe el rol ${rol}`)
            }
        }
    }
}
const contarPassword = (password) =>{
    if (password.length>64){throw new Error('Password mayor de 64 caracteres')}
}
const contarUsuarioCorreo  = (email) =>{
    if (email.length>50){throw new Error('Email mayor de 50 caracteres')}
}
export {existeUsuarioById, existeUsuarioByName, contarUsuarioNombre, existeUsuarioByEmail,existeUsuarioByRol,contarPassword, contarUsuarioCorreo }