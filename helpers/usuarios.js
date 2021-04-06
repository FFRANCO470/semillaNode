import Usuario from '../models/usuario.js'
//validar si existe usuario con el id del token ya desencriptado
const existeUsuarioById = async (id)=>{
    const existe = await Usuario.findById(id)
    if (!existe) {
        throw new Error(`El ID no existe`)
    }
}
export {existeUsuarioById}