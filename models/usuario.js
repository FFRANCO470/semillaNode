import mongoose from 'mongoose';

const  UsuarioSchema=mongoose.Schema({
    nombre:{type:String,required:true,unique:true,maxlength:50},
    email:{type:String, required:true, unique:true,maxlength:50},
    password:{type:String,required:true},
    rol:{type:String, required:true, maxlength:20},//ADMIN_ROL   VENDEDOR_ROL   ALMACENISTA_ROL
    estado:{type:Number,default:1}, // 1:acrivo  0:desactivo
    createdAt:{type:Date,default:Date.now}
})

export default mongoose.model('Usuario',UsuarioSchema)