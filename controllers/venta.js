import { devolucionVentaStock, ventaStock } from '../helpers/venta.js';
import Venta from '../models/venta.js'

const ventaControllers = {
    ventaPost : async(req,res)=>{
        const {usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles} = req.body;
        if (serieComprobante.length > 7) {return res.status(400).json({msg:'serieComprobante mayor a 7 caracteres'})}
        if (numComprobante.length > 10) {return res.status(400).json({msg:'numComprobante mayor a 10 caracteres'})}
        
 
        if (typeof Number(impuesto) !== "number") {return res.status(400).json({msg:'Impuesto tipo numero'})}
        if (Number.isNaN(impuesto)) {return res.status(400).json({msg:'Impuesto tipo numero con letras'})}
        if (Number(impuesto) < 0) {return res.status(400).json({msg:'Precio negativo'})}
        var imp = Number(impuesto)

        if (typeof Number(total) !== "number") {return res.status(400).json({msg:'total tipo numero'})}
        if (Number.isNaN(total)) {return res.status(400).json({msg:'total tipo numero con letras'})}
        if (Number(total) < 0) {return res.status(400).json({msg:'total negativo'})}
        var totales = Number(total)


        const venta = Venta({usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto:imp,total:totales,detalles});
        detalles.map((articulo)=>ventaStock(articulo._id,articulo.cantidad))
        await venta.save();
        res.json({venta})
    },
    ventaGet : async(req,res)=>{
        const value = req.query.value;
        const venta = await Venta
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
        res.json({venta})
    },
    ventaGetById : async(req,res)=>{
        const {id}=req.params;
        const venta = await Venta.findOne({_id:id}).populate('usuario','nombre').populate('persona','nombre');
        res.json({venta})
    },    
    ventaPutActivar : async(req,res)=>{
        const {id} = req.params;
        const ventaActiva = await Venta.findOne({_id:id})
        if(ventaActiva.estado==1){
            return res.status(400).json({msg:'Venta ya activa'})
        }
        const venta = await Venta.findByIdAndUpdate(id,{estado:1})
        ventaActiva.detalles.map((articulo)=>ventaStock(articulo._id,articulo.cantidad))
        res.json({venta})
    },
    ventaPutDesactivar : async(req,res)=>{
        const {id} = req.params;
        const ventaDesactivada = await Venta.findOne({_id:id})
        if(ventaDesactivada.estado==0){
            return res.status(400).json({msg:'Venta ya desactivada'})
        }
        const venta = await Venta.findByIdAndUpdate(id,{estado:0})
        ventaDesactivada.detalles.map((articulo)=>devolucionVentaStock(articulo._id,articulo.cantidad))
        res.json({venta})
    },

}

export default ventaControllers