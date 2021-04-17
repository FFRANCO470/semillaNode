import mongoose from 'mongoose';

const ArticuloSchema = new mongoose.Schema({
    categoria:{type:mongoose.Schema.Types.ObjectId,ref:'Categoria',required:true},
    codigo:{type:String,required:true,maxlength:64,unique:true},
    nombre:{type:String,required:true,maxlength:50,unique:true},
    descripcion:{type:String,default:"",maxlength:255},
    precio:{type:Number,default:0,required:true},
    costo:{type:Number,default:0,required:true},
    stock:{type:Number,default:1,required:true},
    estado:{type:Number,default:1},//1 activo 0 desactivado
}, {
    timestamps : true,
    versionkey: false
})

export default mongoose.model('Articulo',ArticuloSchema)