import mongoose from 'mongoose';

const PersonaSchema = mongoose.Schema({
    tipoPersona : {type:String, required:true, maxlength:50},//cliente o proveedor
    nombre:{type:String,required:true,maxlength:64},
    tipoDocumento:{type:String,required:true,maxlength:50},//CC TI CE NIT
    numDocumento:{type:String,required:true,maxlength:20},
    direccion:{type:String,required:true,maxlength:50},
    telefono:{type:Number, default:0,maxlength:20},
    email:{type:String, default: 'NN',maxlength:50},
    estado:{type:Number,default:1},//1 activo 0 desactivado
    createAt:{type:Date,default:Date.now}    
})

export default mongoose.model('Persona',PersonaSchema)