//referencia para evaluar los documentos de los modelos
import Categoria from '../models/categoria.js'
//Funcion para verificar que no existe ID
const existeCategoriaById = async (id)=>{
    const existe = await Categoria.findById(id)
    if(!existe) throw new Error(`No existe categoria con ese ID`)
}
//Funcion para veririfcar si ya existe ese nombre
const existeCategoriaByNombre = async (nombre)=>{
    const existe = await Categoria.findOne({nombre})
    if (existe) throw new Error('Categoría ya existente')
}
const contarCategoriaNombre = (nombre) =>{
    if (nombre.length>50) {throw new Error(`Nombre exede los 50 caracteres`)}
}
const contarCategoriaDescripcion = (descripcion) =>{
    if (descripcion.length>255) {throw new Error(`Descripcion exede los 255 caracteres`)}
}

export {existeCategoriaById,existeCategoriaByNombre, contarCategoriaNombre, contarCategoriaDescripcion}