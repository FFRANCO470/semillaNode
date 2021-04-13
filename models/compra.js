import mongoose from 'mongoose';

const CompraSchema = mongoose.Schema({
    usuario:{type:mongoose.Schema.Types.ObjectId,ref:'Usuario',required:true},
    persona:{type:mongoose.Schema.Types.ObjectId,ref:'Persona',required:true},//SOLO PROVEEDOR
    tipoComprobante:{type:String,required:true,maxlength:20},//FACTURA, NOTA DEBITO,NOTA CREDITO
    serieComprobante:{type:String,required:true,maxlength:7},
    numComprobante:{type:String,required:true,maxlength:10},
    impuesto:{type:Number,required:true},
    total:{type:Number,required:true},
    detalles:{type:Array, required:true},
    estado:{type:Number,default:1},//1 activo 0 desactivado
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Compra',CompraSchema)

//usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles