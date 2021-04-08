
import Articulo from '../models/articulo.js'

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

export {ventaStock,devolucionVentaStock}