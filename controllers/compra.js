import mongodb from 'mongodb'
import Compra from '../models/compra.js'
import Persona from '../models/persona.js'
import { aumentarStock , disminuirStock} from '../helpers/compra.js';
import { existeArticuloByIdlista} from '../helpers/articulo.js';

//usuario (ob),persona(ob prove),tipoComprobante(ob),serieComprobante(ob),numComprobante(ob),impuesto(ob),total(ob),detalles(ob),
const compraControllers = {
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
    compraPost : async (req,res) => {
        const {usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles} = req.body;
        const personaActiva = await Persona.findOne({_id:persona})
        if (personaActiva.estado === 0) {return res.json({msg:'persona desactivado'})}
        if (impuesto) {if (typeof impuesto != "number") {return res.json({msg:'impuesto tipo numero'})}}
        if (total) {if (typeof total != "number") {return res.json({msg:'total tipo numero'})}}
        var mensaje='';
        var objectid = mongodb.ObjectID
        detalles.forEach(  (element) => {
            if (!element._id) {return mensaje ='id de articulo obligatorio'}
            if (!objectid.isValid(element._id)) {return mensaje ='id de articulo invalido'}
            let esta =  existeArticuloByIdlista(element)
            console.log('pepeasdf');
            console.log(esta);
            // esta.then(function(result) {
            //     console.log(result) 
            //  })
            // console.log(esta);
            //if(esta == 'no'){return mensaje='no hay articulo'}
            if (!element.articulo) {return mensaje ='nombre de articulo obligatorio'}
            if (!element.cantidad) {return mensaje ='cantidad obligatorio'}
            if (typeof element.cantidad != "number"    ) {return mensaje ='cantidad es numero'}
            if (!element.costo) {return mensaje ='costo obligatorio'}
            if (typeof element.costo != "number"    ) {return mensaje ='costo es numero'}
        });

        if (mensaje!='') {
            return res.json({msg:mensaje})
        }else{
            const compra = Compra({usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles});
            detalles.map((articulo)=>aumentarStock(articulo._id,articulo.cantidad))
            await compra.save();
            res.json({compra})
        }        
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