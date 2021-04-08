import mongoose from 'mongoose';

const ArticuloSchema = mongoose.Schema({
    categoria:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria',required:true},
    codigo:{type:String,required:true,maxlength:64,unique:true},
    nombre:{type:String,required:true,maxlength:64,unique:true},
    descripcion:{type:String,maxlength:64},
    precio:{type:Number,default:0},
    costo:{type:Number,default:0},
    stock:{type:Number,default:0},
    estado:{type:Number,default:1},//1 activo 0 desactivado
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Articulo',ArticuloSchema)