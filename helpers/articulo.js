import Articulo from '../models/articulo.js'
//funcion para buscar id
const existeArticuloById = async (id) =>{
    const existe = await Articulo.findById(id)
    if(!existe) throw new Error(`No existe articulo con ese ID`)
}
//Funcion para veririfcar si ya existe ese nombre
const existeArticuloByNombre = async (nombre)=>{
    const existe = await Articulo.findOne({nombre})
    if (existe) throw new Error('Articulo con nombre ya existente')
}
//Funcion para veririfcar si ya existe ese codigo
const existeArticuloByCodigo = async (codigo)=>{
    const existe = await Articulo.findOne({codigo})
    if (existe) throw new Error('Articulo con codigo ya existente')
}
const existeArticuloByIdlista = async (element)=>{
    const existe = await Articulo.findOne({_id:element._id})
    if(!existe){
        return 'no'
    }else{
        return existe
    }
}
const existeArticuloByIdBool = async (id) =>{
    const existe = await Articulo.findById(id)
    if(existe) return true 
    else return false
}

export {existeArticuloById, existeArticuloByIdlista, existeArticuloByNombre, existeArticuloByCodigo,existeArticuloByIdBool}