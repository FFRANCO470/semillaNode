import Articulo from '../models/articulo.js';
import mongodb from 'mongodb'
import Categoria from '../models/categoria.js';
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
        const articulo = await Articulo.findOne({_id:id}).populate('categoria','nombre')
        res.json({articulo})
    },
    articulosGetCategoria : async (req,res)=>{
        const {id}=req.params;
        const articulos = await Articulo.find({categoria:id})   //.findOne({_id:id})
        res.json({articulos})
    },
    articuloPost : async (req,res)=>{
        const {categoria,codigo,nombre,descripcion,precio,costo,stock} = req.body

        const categoriaActiva = await Categoria.findOne({_id:categoria})
        if (categoriaActiva.estado === 0) {return res.json({msg:'Categoria desactivado'})}

        if (precio) {
            if (typeof precio != "number") {return res.json({msg:'Precio tipo numero'})}
        }
        if (costo) {
            if (typeof costo != "number") {return res.json({msg:'Costo tipo numero'})}
        }
        if (stock) {
            if (typeof stock != "number") {return res.json({msg:'Stock tipo numero'})}
        }
        const articulo = new Articulo({categoria,codigo,nombre,descripcion,precio,costo,stock})
        await articulo.save()
        res.json({articulo})
    },
    articuloPut : async (req,res)=>{
        const {id} = req.params
        const {_id,estado,createAt,__v,...resto} = req.body

        const user = await Articulo.findOne({_id:id})
        if (user.estado === 0) {return res.json({msg:'Articulo desactivado'})}

        //si biene precio que sea numero
        if (resto.precio) {
            if (typeof resto.precio != "number") {return res.json({msg:'Precio tipo numero'})}
        }
        //si biene costo que sea numero
        if (resto.costo) {
            if (typeof resto.costo != "number") {return res.json({msg:'Costo tipo numero'})}
        }
        //si biene stock que sea numero
        if (resto.stock) {
            if (typeof resto.stock != "number") {return res.json({msg:'Stock tipo numero'})}
        }

        if (resto.categoria) {
            //validar que se un id
            var objectid = mongodb.ObjectID;
            if (!objectid.isValid(resto.categoria)) {return res.json({msg:'ID de categoria no valido'})}
            //verificar que exista categoria con ese id
            const existenciaCategoria = await Categoria.findOne({_id:resto.categoria})
            if (!existenciaCategoria) {return res.json({msg:'ID sin categoria'})}
        }

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