import mongodb from 'mongodb'
import Compra from '../models/compra.js'
import Persona from '../models/persona.js'
import { aumentarStock , disminuirStock} from '../helpers/compra.js';
import { existeArticuloByIdlista} from '../helpers/articulo.js';
import Articulo from '../models/articulo.js';

//usuario, persona, tipoComprobante, serieComprobante(7), numComprobante(10), impuesto, total, detalles
const compraControllers = {
    compraPost : async (req,res) => {
        const {usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles} = req.body;
        
        if (serieComprobante.length > 7) {return res.status(400).json({msg:'serieComprobante mayor a 7 caracteres'})}
        if (numComprobante.length > 10) {return res.status(400).json({msg:'numComprobante mayor a 10 caracteres'})}
        if (typeof impuesto != "number")  {return res.status(400).json({msg:'impuesto es tipo numero'})}
        if (typeof total != "number")  {return res.status(400).json({msg:'total es tipo numero'})}


        var objectid = mongodb.ObjectID
        var mensaje = ""
        detalles.map(async(element)=>{

            if (element._id === undefined ) {return mensaje ='id de articulo obligatorio'}
            if (element._id === "") {return mensaje ='id de articulo vacio'}
            if (!objectid.isValid(element._id)) {return mensaje ='id de articulo invalido'}
            const existeID = await Articulo.findOne({_id:element._id})
            console.log(existeID);
            if(existeID === 'null'){return mensaje ='Ariticulo no existe'}

            if (element.articulo === undefined) {return mensaje ='nombre de articulo obligatorio'}
            if (element.articulo === "") {return mensaje ='nombre de articulo vacio'}            
            //if (element.articulo !== existeID.nombre) {return mensaje ='inconsistencai en el nombre'}

            if (element.cantidad === undefined) {return mensaje ='cantidad obligatoria'}
            if (element.cantidad === "") {return mensaje ='cantidad vacia'}
            if (typeof element.cantidad != "number" ) {return mensaje ='cantidad es numero'}

            if (element.costo === undefined) {return mensaje = "costo obligatorio"}
            if (element.costo === "") {return mensaje = "costo vacio"}
            if (typeof element.costo != "number" ) {return mensaje = "costo es tipo numero"}
        })
        console.log('mensaje');
        console.log(mensaje);
        console.log('mensaje');
        if(mensaje !== ""){
            return res.json({msg:mensaje})
        }else{
            const compra = Compra({usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles});
            detalles.map((articulo)=>aumentarStock(articulo._id,articulo.cantidad))
            await compra.save();
            res.json({compra})
        }

        
        
    },



    compraGet:async ( req,res)=>{
        const value = req.query.value;
        const compra = await Compra
            .find({
                $or:[
                    {tipoComprobante:new RegExp(value,'i')},
                    {serieComprobante:new RegExp(value,'i')},
                    {numComprobante:new RegExp(value,'i')}
                ]
            })
            .sort({'createAt':1})
            .populate('usuario','nombre')
            .populate('persona','nombre');
        res.json({compra})
    },
    compraGetById : async (req,res)=>{
        const {id}=req.params;
        const compra = await Compra.findOne({_id:id}).populate('usuario','nombre').populate('persona','nombre');
        res.json({compra})
    },
    
    compraPut : async (req,res)=>{
        const {id} = req.params;
        const {_id,detalles,estado,impuesto,total,createAt,__v,...resto} = req.body;
        const compra = await Compra.findByIdAndUpdate(id,resto)//usuario,persona,tipoComprobante,serieComprobante,numComprobante
        res.json({compra})
    },
    compraPutActivar : async ( req,res) =>{
        const {id} = req.params;
        const compra = await Compra.findByIdAndUpdate(id,{estado:1})
        const compraActiva = await Compra.findOne({_id:id})
        compraActiva.detalles.map((articulo)=>aumentarStock(articulo._id,articulo.cantidad))
        res.json({compra})
    },
    compraPutDesactivar : async ( req , res )=>{
        const {id} = req.params;
        const compra = await Compra.findByIdAndUpdate(id,{estado:0})
        const compraActiva = await Compra.findOne({_id:id})
        compraDesactiva.detalles.map((articulo)=>disminuirStock(articulo._id,articulo.cantidad))
        res.json({compra})
    }
}
export default compraControllers