import Articulo from '../models/articulo.js';
const articulosControllers={
    articuloGet : async (req,res)=>{
        const value = req.query.value;
        
        const articulos = await Articulo
            .find({$or:[
                    {codigo:new RegExp(value,'i') },
                    {nombre:new RegExp(value,'i')},
                    {descripcion:new RegExp(value,'i')}
                ]
            })
            //traer datos de otro modelo
            .populate('categoria','nombre')
        res.json({articulos})
    },
    articuloGetById : async (req,res) => {
        const {id}=req.params;
        const articulo = await Articulo.findOne({_id:id})
        res.json({articulo})
    },
    articulosGetCategoria : async (req,res)=>{
        const {id}=req.params;
        const articulos = await Articulo.find({categoria:id})   //.findOne({_id:id})
        res.json({articulos})
    },
    articuloPost : async (req,res)=>{
        const {categoria,codigo,nombre,descripcion,precio,costo,stock} = req.body
        const articulo = new Articulo({categoria,codigo,nombre,descripcion,precio,costo,stock})
        await articulo.save()
        res.json({articulo})
    },
    articuloPut : async (req,res)=>{
        const {id} = req.params
        const {_id,estado,createAt,__v,...resto} = req.body
        const articulo = await Articulo.findByIdAndUpdate(id,resto)//categoria, codigo, nombre, descripcion, precio, costo, stock
        res.json({articulo})
    },
    articuloPutActivar : async (req,res)=>{
        const {id} = req.params
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:1});
        res.json({articulo})
    },
    articuloPutDesactivar : async (req,res)=>{
        const {id} = req.params
        const articulo = await Articulo.findByIdAndUpdate(id,{estado:0});
        res.json({articulo})
    }
}
export default articulosControllers