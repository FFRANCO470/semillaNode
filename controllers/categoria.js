//para operar sobre la base de datos o los modelos
import Categoria from "../models/categoria.js"
//variable global para controloar la cantidad de controles exportados es decir exportar uno y no muchos
const categoriasControllrs ={
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
        //buscar y devolver como un objeto
        const categoria = await Categoria.findOne({_id:id})
        res.json({categoria})
    },
    //objeto para guardar los datos en la base de datos
    categoriaPost:async (req,res)=>{
        //Recibe los datos que envia el cliente por el body
        const {nombre, descripcion} = req.body;
        //crea la categiria y los llena con los datos recibidos por el cliente
        const categoria = Categoria({nombre, descripcion});
        //guardar en la base de datos
        await categoria.save();
        //responder el usuario
        res.json({categoria})
    },
    //objeto para actualizar
    categoriaPut: async (req,res)=>{
        //recibe id de la categoria a modificar
        const {id}=req.params;
        //apartar vareables de las que no se usan a las que se usan
        const {_id,estado,createAt,__v,...resto}=req.body;
        //objeto que busca por id y modifica el nombre y descripcion 
        const categoria = await Categoria.findByIdAndUpdate(id,resto);
        res.json({
            categoria
        })
    },
    //objeto para activar categoria
    categoriaPutActivar : async (req,res)=>{
        const {id} = req.params;
        //busca por el id y cambia el estado a 1
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:1});
        res.json({
            categoria
        })
    },
    //busca por el id y cambia el estado a 0
    categoriaPutDesactivar: async (req,res)=>{
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndUpdate(id,{estado:0});
        res.json({
            categoria
        })
    },
    //busca por el id y elimina la categoria
    categoriaDelete: async (req,res)=>{
        const {id} = req.params;
        const categoria = await Categoria.findByIdAndDelete(id);
        res.json({
            categoria
        })
    }
};

export default categoriasControllrs