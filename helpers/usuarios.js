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

export {existeUsuarioById, existeUsuarioByName, existeUsuarioByEmail,existeUsuarioByRol }