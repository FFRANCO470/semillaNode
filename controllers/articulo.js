import Articulo from '../models/articulo.js';
import mongodb from 'mongodb'
import Categoria from '../models/categoria.js';
import { rectificandoNombre,rectificandoCodigo } from '../helpers/articulo.js';
const articulosControllers={
    articuloPost : async (req,res)=>{
        const {categoria,codigo,nombre,descripcion,precio,costo,stock} = req.body
        
        const categoriaActiva = await Categoria.findOne({_id:categoria})
        if (categoriaActiva.estado === 0) {return res.status(400).json({msg:'Categoria desactivado'})}
        if(codigo.length>64){return res.status(400).json({msg:'Codigo mayor 64 caracteres'})}
        if(nombre.length>50){return res.status(400).json({msg:'Nombre mayor 50 caracteres'})}
        if (descripcion) {
            if(descripcion.length>255){return res.status(400).json({msg:'Descripcion mayor 255 caracteres'})}
        }

        var pres = 0

        if (precio) {
            if (typeof Number(precio) !== "number") {return res.status(400).json({msg:'Precio tipo numero'})}
            if (Number.isNaN(precio)) {return res.status(400).json({msg:'Precio tipo numero con letras'})}
            pres = Number(precio);
            if (pres < 0) {return res.status(400).json({msg:'Precio negativo'})}
        }


        var cost = 0
        if (costo) {
            if (typeof Number(costo) !== "number") {return res.status(400).json({msg:'Costo tipo numero'})}
            if (Number.isNaN(costo)) {return res.status(400).json({msg:'Costo tipo numero con letras'})}
            cost = Number(costo);
            if (cost < 0) {return res.status(400).json({msg:'Costo negativo'})}
        }

        var cant = 0
        if (stock) {
            if (typeof Number(stock) !== "number") {return res.status(400).json({msg:'Stock tipo numero'})}
            if ( Number.isNaN(stock)) {return res.status(400).json({msg:'Stock tipo numero con letras'})}
            cant = Number(stock);
            if (cant == 0) {return res.status(400).json({msg:'Stock negativo'})}
        }

        const articulo = new Articulo({categoria,codigo,nombre,descripcion,precio:pres,costo:cost,stock:cant})
        await articulo.save()
        res.json({articulo})
    },
    articuloGet : async (req,res)=>{
        const value = req.query.value;
        const articulos = await Articulo
            .find({$or:[
                    {codigo:new RegExp(value,'i') },
                    {nombre:new RegExp(value,'i')},
                    {descripcion:new RegExp(value,'i')}
                ]
            })
            .populate('categoria','nombre')//traer datos de otro modelo
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
    articuloPut : async (req,res)=>{//categoria,codigo,nombre,descripcion,precio,costo,stock
        const {id} = req.params
        const {_id,estado,createAt,__v,...resto} = req.body

        const user = await Articulo.findOne({_id:id})
        if (user.estado === 0) {return res.status(400).json({msg:'Articulo desactivado'})}


        if(resto.nombre == "") {return res.status(400).json({msg:'Nombre vacio (nada)'})}
        if (resto.nombre) {
            var name = resto.nombre.trim();
            if(name.length == 0) {return res.status(400).json({msg:'Nombre vacio'})}
            var validar = await rectificandoNombre(resto.nombre,id);
            if(validar==false){return res.status(400).json({msg:'Nombre ya existente'})}
            if (name.length > 50) {return res.status(400).json({msg:'Nombre mayor 50 caracteres'})}
        }
       
        

        if(resto.codigo === "") {return res.status(400).json({msg:'Codigo vacio (nada)'})}
        if (resto.codigo) {
            var code = resto.codigo.trim();
            if(code.length==0){return res.status(400).json({msg:'codigo vacio'})}
            var validar = await rectificandoCodigo(resto.codigo,id);
            if(validar==false){return res.status(400).json({msg:'codigo ya existente'})}
            if (resto.codigo.length > 64) {return res.status(400).json({msg:'Codigo mayor 64 caracteres'})}
        }

        if(resto.descripcion == "") {return res.status(400).json({msg:'Descripcion vacio'})}
        if (resto.descripcion) {
            if (resto.descripcion.length > 255) {return res.status(400).json({msg:'Descripcion mayor 255 caracteres'})}
        }

        if(resto.precio === "") {return res.status(400).json({msg:'precio vacio'})}
        if (resto.precio) {
            if (typeof resto.precio != "number") {return res.status(400).json({msg:'Precio tipo numero'})}//si biene precio que sea numero
            if (resto.precio < 0) {return res.status(400).json({msg:'Precio negativo'})}
        }

        if(resto.costo === "") {return res.status(400).json({msg:'Costo vacio'})}
        if (resto.costo) {
            if (typeof resto.costo != "number") {return res.status(400).json({msg:'Costo tipo numero'})}//si biene costo que sea numero
            if (resto.costo < 0) {return res.status(400).json({msg:'Costo negativo'})}
        }

        if(resto.stock === "") {return res.status(400).json({msg:'Stock vacio'})}
        if (resto.stock) {
            if (typeof resto.stock != "number") {return res.status(400).json({msg:'Stock tipo numero'})}//si biene stock que sea numero
            if (resto.stock < 0) {return res.status(400).json({msg:'Stock negativo'})}
        }

        if(resto.categoria === ""){return res.status(400).json({msg:'Categoria vacia'})}
        if (resto.categoria) {
            var objectid = mongodb.ObjectID;//validar que se un id
            if (!objectid.isValid(resto.categoria)) {return res.status(400).json({msg:'ID de categoria no valido'})}
            const existenciaCategoria = await Categoria.findOne({_id:resto.categoria})//verificar que exista categoria con ese id
            if (!existenciaCategoria) {return res.status(400).json({msg:'ID sin categoria'})}
            if(existenciaCategoria.estado == 0) {return res.status(400).json({msg:'Categoria desactivada'})}
        }

        if(Object.entries(resto).length==0){return res.status(400).json({msg:'No actualizo nada'})}
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