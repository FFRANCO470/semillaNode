import { ventaStock } from '../helpers/venta.js';
import Venta from '../models/venta.js'

const ventaControllers = {
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
            .populate('persona','tipoPersona');
        res.json({venta})
    },
    ventaGetById : async(req,res)=>{
        const {id}=req.params;
        const venta = await Venta.findOne({_id:id})
        res.json({venta})
    },
    ventaPost : async(req,res)=>{
        const {usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles} = req.body;
        const venta = Venta({usuario,persona,tipoComprobante,serieComprobante,numComprobante,impuesto,total,detalles});
        detalles.map((articulo)=>ventaStock(articulo._id,articulo.cantidad))
        await venta.save();
        res.json({venta})
    },
    ventaPut : async(req,res)=>{},
    ventaPutActivar : async(req,res)=>{},
    ventaPutDesactivar : async(req,res)=>{},

}

export default ventaControllers