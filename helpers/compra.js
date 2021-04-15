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

// 
//         detalles.forEach(  async (element) => {
//             if (!element._id) {return mensaje ='id de articulo obligatorio'}
//             if (element._id === "") {return mensaje ='id de articulo obligatorio'}
//             if (!objectid.isValid(element._id)) {return mensaje ='id de articulo invalido'}
//             //const existeID = await Articulo.findOne({_id:element._id})
//             //if(existeID==null){return mensaje ='Ariticulo no existe'}

//             if (!element.articulo) {return mensaje ='nombre de articulo obligatorio'}
//             if (element.articulo === "") {return mensaje ='nombre de articulo obligatorio'}            
//             //if (element.articulo !== existeID.nombre) {return mensaje ='nombre de articulo obligatorio'}

//             if (!element.cantidad) {return mensaje ='cantidad obligatorio'}
//             if (element.cantidad === "") {return mensaje ='cantidad obligatorio'}
//             if (typeof element.cantidad != "number" ) {return mensaje ='cantidad es numero'}

//             if (!element.costo) {return mensaje ='costo obligatorio'}
//             if (element.costo === "") {return mensaje ='costo obligatorio'}
//             if (typeof element.costo != "number" ) {return mensaje ='costo es numero'}    
//         })

// const existeDetalle = (detalles)=>{
//     var objectid = mongodb.ObjectID
//     detalles.foreach( (articulo)=>{
//         if (!articulo._id) {throw new Error('id obligatorio')}
//         if (!objectid.isValid(articulo._id)) {throw new Error('no es un id')}

//         if (!articulo.articulo) {throw new Error('articulo obligatorio')}
//         if (!articulo.cantidad) {throw new Error('cantidad obligatorio')}
//         if (typeof element.cantidad != "number"  ) {throw new Error('cantidad numero')}
//         if (!articulo.costo) {throw new Error('costo obligatorio')}
//         if (typeof element.costo != "number") {throw new Error('costo numero')}
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








const existeCompraById = async (id) =>{
    const existe = await Compra.findById(id)
    if(!existe) throw new Error('No existe compra con ese ID')
}

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

export {existeTipoComprobante, personaActiva, existeCompraById, aumentarStock, disminuirStock}