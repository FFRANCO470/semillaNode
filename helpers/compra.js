import Articulo from '../models/articulo.js'
import Compra from '../models/compra.js';
import mongodb from 'mongodb'

const existeCompraById = async (id) =>{
    const existe = await Compra.findById(id)
    if(!existe) throw new Error('No existe compra con ese ID')
}
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
      

// const existeDetalle = (detalles)=>{
//     var objectid = mongodb.ObjectID
//     detalles.map( (articulo)=>{
//         //if (!articulo._id) {throw new Error('id obligatorio')}
//         //if (!objectid.isValid(articulo._id)) {throw new Error('no es un id')}

//         //if (!articulo.articulo) {throw new Error('articulo obligatorio')}
//         //if (!articulo.cantidad) {throw new Error('cantidad obligatorio')}
//         //if (!articulo.costo) {throw new Error('costo obligatorio')}
//     })
// }

//if (resto.categoria) {
            //validar que se un id
        //    var objectid = mongodb.ObjectID;
        //    if (!objectid.isValid(resto.categoria)) {return res.json({msg:'ID de categoria no valido'})}
            //verificar que exista categoria con ese id
        //    const existenciaCategoria = await Categoria.findOne({_id:resto.categoria})
        //    if (!existenciaCategoria) {return res.json({msg:'ID sin categoria'})}
        //}







//recibir el id del articulo que va a modificar y la cantidad que va a sumar 
const aumentarStock = async (_id,cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    stock = parseInt(stock) + parseInt(cantidad)
    await Articulo.findByIdAndUpdate({_id},{stock})
}

const disminuirStock = async (_id,cantidad) =>{
    let {stock} = await Articulo.findById(_id);
    stock = parseInt(stock) - parseInt(cantidad)
    await Articulo.findByIdAndUpdate({_id},{stock})
}

export {existeCompraById, existeTipoComprobante, aumentarStock,disminuirStock}