import Persona from '../models/persona.js'

const existePersonaById = async (id) =>{
    const existe = await Persona.findById(id)
    if(!existe) throw new Error ('No existe persona con ese ID')
}
const existePersonaByNombre = async (nombre)=>{
    const existe = await Persona.findOne({nombre})
    if(existe) throw new Error ('Persona con ese nombre ya existe')
}
const existePersonaByEmail = async (email) =>{
    const existe = await Persona.findOne({email})
    if(existe) throw new Error ('Persona con ese email ya existe')
}

export {existePersonaById, existePersonaByNombre, existePersonaByEmail}