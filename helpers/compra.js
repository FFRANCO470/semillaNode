import Articulo from '../models/articulo.js'
import Compra from '../models/compra.js';
import Persona from '../models/persona.js'

//FACTURA, NOTA DEBITO,NOTA CREDITO
const existeTipoComprobante = async (tipoComprobante) =>{
    if (tipoComprobante != "FACTURA")  {
        if (tipoComprobante != "NOTA DEBITO") {
            if (tipoComprobante != "NOTA CREDITO") {
                throw new Error(`solo FACTURA, NOTA DEBITO,NOTA CREDITO`)
            }
        }
    }
}

const personaActiva = async (persona)=>{
    const personaActiva = await Persona.findOne({_id:persona})
    if (personaActiva.estado === 0) {throw new Error('Persona desactivada')}
    if (personaActiva.tipoPersona !== "proveedor") {throw new Error('Solo proveedores')}
}


const existeCompraById = async (id) =>{
    const existe = await Compra.findById(id)
    if(!existe) throw new Error('No existe compra con ese ID')
}

//recibir el id del articulo que va a modificar y la cantidad que va a sumar 
const aumentarStock = async (_id,cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    console.log(stock);
    stock = parseInt(stock) + parseInt(cantidad)
    await Articulo.findByIdAndUpdate({_id},{stock})
}

const disminuirStock = async (_id,cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    stock = parseInt(stock) - parseInt(cantidad)
    await Articulo.findByIdAndUpdate({_id},{stock})
}

export {existeTipoComprobante, personaActiva, existeCompraById, aumentarStock, disminuirStock}