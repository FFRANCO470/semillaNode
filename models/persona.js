import mongoose from 'mongoose';

const PersonaSchema = mongoose.Schema({
    tipoPersona : {type:String, required:true, maxlength:9},//cliente o proveedor
    nombre:{type:String, required:true, maxlength:50, uniqued:true},
    tipoDocumento:{type:String,maxlength:20},
    numDocumento:{type:String,maxlength:20},
    direccion:{type:String,maxlength:70},
    telefono:{type:String, maxlength:15},
    email:{type:String, uniqued:true, required:true, maxlength:50},
    estado:{type:Number,default:1},//1 activo 0 desactivado
    createAt:{type:Date,default:Date.now}    
})

export default mongoose.model('Persona',PersonaSchema)


//tipoPersona(obliga), nombre(obliga)(unico), tipoDocumento, numDocumento, direccion, telefono, email(unico)