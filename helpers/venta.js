
import mongoose from 'mongoose'
import Articulo from '../models/articulo.js'
import Persona from '../models/persona.js'
import Venta from '../models/venta.js'
import { existeArticuloByIdBool } from './articulo.js';

//recibir el id del articulo que va a modificar y la cantidad que va a sumar 
const ventaStock = async (_id,cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    stock = parseInt(stock) - parseInt(cantidad)
    await Articulo.findByIdAndUpdate({_id},{stock})
}
const devolucionVentaStock = async (_id,cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    stock = parseInt(stock) + parseInt(cantidad)
    await Articulo.findByIdAndUpdate({_id},{stock})
}
const personaActiva = async(persona)=>{
    const personaActiva = await Persona.findOne({_id:persona})
    if(personaActiva.estado ===0){throw new Error('Persona desactivada')}
    if(personaActiva.tipoPersona !== 'cliente'){throw new Error('solo clientes')}
}
const existeTipoComprobante = async(tipoComprobante)=>{
    if (tipoComprobante != "FACTURA")  {
        if (tipoComprobante != "NOTA DEBITO") {
            if (tipoComprobante != "NOTA CREDITO") {
                throw new Error(`solo FACTURA, NOTA DEBITO,NOTA CREDITO`)
            }
        }
    }
}
const validarArticuloDetalle = async (detalles)=>{
    for(let detalle of detalles){
        if(mongoose.Types.ObjectId.isValid(detalle._id)){
            const existe = await existeArticuloByIdBool(detalle._id)
            if(!existe) throw new Error (`El id ${detalle._id} no existe`)
        }else throw new Error (`El id ${detalle._id} no es valido`)
    }
}
const existeVentaById = async(id)=>{
    const existe = await Venta.findById(id)
    if(!existe) throw new Error('No existe venta con ese ID')
}
export {ventaStock,devolucionVentaStock,personaActiva,existeTipoComprobante,validarArticuloDetalle,existeVentaById}