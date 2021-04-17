//representacion de la base de datos 
import mongoose from "mongoose"
//crear coleccion
const CategoriaSchema = mongoose.Schema({
    nombre:{type:String, required:true, maxlength:50, unique:true},
    descripcion:{type:String, required:true, maxlength:255},
    estado:{type:Number, default:1},//1 activo 0 desactivo
    createAt:{type:Date, default:Date.now}
})
//exportar coleccion
export default mongoose.model('Categoria', CategoriaSchema)