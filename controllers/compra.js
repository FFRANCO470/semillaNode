import Compra from '../models/compra.js'
import { aumentarStock , disminuirStock} from '../helpers/compra.js';

//usuario, persona, tipoComprobante, serieComprobante(7), numComprobante(10), impuesto, total, detalles

const compraControllers = {
    compraPost : async (req,res) => {
        const {usuario, persona, tipoComprobante, serieComprobante, numComprobante, impuesto, total, detalles} = req.body;
        //if (serieComprobante.length > 7) {return res.status(400).json({msg:'serieComprobante mayor a 7 caracteres'})}
        //if (numComprobante.length > 10) {return res.status(400).json({msg:'numComprobante mayor a 10 caracteres'})}
        if (typeof impuesto != "number")  {return res.status(400).json({msg:'impuesto es tipo numero'})}
        if (typeof total != "number")  {return res.status(400).json({msg:'total es tipo numero'})}
        const compra = Compra({usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles});
        detalles.map((articulo)=>aumentarStock(articulo._id,articulo.cantidad))
        await compra.save();
        res.json({compra})
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