//para operar sobre la base de datos o los modelos
import Categoria from "../models/categoria.js"
//variable global para controloar la cantidad de controles exportados es decir exportar uno y no muchos
const categoriasControllrs ={
    //objeto para guardar los datos en la base de datos
    categoriaPost:async (req,res)=>{
        const {nombre, descripcion} = req.body;//Recibe los datos que envia el cliente por el body
        if(nombre.length>50){return res.status(400).json({msg:'Nombre mayor 50 caracteres'})}
        if(descripcion.length>255){return res.status(400).json({msg:'Descripcion mayor 255 caracteres'})}
        const categoria = Categoria({nombre, descripcion});//crea la categiria y los llena con los datos recibidos por el cliente
        await categoria.save();//guardar en la base de datos
        res.json({categoria})//responder el usuario
    },
    //objeto para peidr una lista a la base de datos
    categoriaGet:async(req, res)=>{
        const value = req.query.value;
        //buscar y devolver como un array de objetos
        const categoria = await Categoria
            .find({
                $or:[
                    {nombre:new RegExp(value,'i')},
                    {descripcion:new RegExp(value,'i')}
                ]
            })
            .sort({'createAt':1});
        res.json({categoria})
    },
    //objeto para pedir algo de la lista tieneindo el id
    categoriaGetById: async(req,res)=>{
        const {id}=req.params;
        const categoria = await Categoria.findOne({_id:id})//buscar y devolver como un objeto
        res.json({categoria})
    },
    //objeto para actualizar
    categoriaPut: async (req,res)=>{
        const {id}=req.params;//recibe id de la categoria a modificar
        const user = await Categoria.findOne({_id:id})//saber si esta activa la categoria
        if (user.estado === 0) {return res.status(400).json({msg:'Categoria desactivada'})}
        //descomponer variables
        const {_id,estado,createAt,__v,...resto}=req.body;//nombre, descripcion
        if(resto.nombre.length>50){return res.status(400).json({msg:'Nombre mayor 50 caracteres'})}
        if(resto.descripcion){
            if(resto.descripcion.length>255){return res.status(400).json({msg:'Descripcion mayor 255 caracteres'})}
        }
        const categoria = await Categoria.findByIdAndUpdate(id,resto);//objeto que busca por id y modifica el nombre y descripcion 
        res.json({categoria})
    },
    //objeto para activar categoria
    categoriaPutActivar : async (req,res)=>{
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:1});//busca por el id y cambia el estado a 1
        res.json({categoria})
    },
    //busca por el id y cambia el estado a 0
    categoriaPutDesactivar: async (req,res)=>{
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:0});
        res.json({categoria})
    },
    //busca por el id y elimina la categoria
    categoriaDelete: async (req,res)=>{
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndDelete(id);
        res.json({categoria})
    }
};

export default categoriasControllrs