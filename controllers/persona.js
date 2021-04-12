import Persona from '../models/persona.js'


//tipoPersona(obliga), nombre(obliga)(unico), tipoDocumento, numDocumento, direccion, telefono, email(unico)
const personasControllers = {
    personaGet: async (req,res)=>{
        const value = req.query.value;
        const persona = await Persona.find({
            $or:[
                {tipoPersona:new RegExp(value,'i')},
                {nombre:new RegExp(value,'i')},
                {tipoDocumento:new RegExp(value,'i')},
                {numDocumento:new RegExp(value,'i')},
                {direccion:new RegExp(value,'i')},
                {telefono:new RegExp(value,'i')},
                {email:new RegExp(value,'i')},
            ]
        })
        res.json({persona})
    },
    personaGetById : async (req,res)=>{
        const {id}=req.params;
        const articulo = await Persona.findOne({_id:id})
        res.json({articulo})
    },

    personaGetListCliente : async (req,res)=>{
        const value = req.query.value;
        const persona = await Persona.find({
            $and:[
                {tipoPersona:"cliente"},
                $or=[
                {nombre:new RegExp(value,'i')},
                {tipoDocumento:new RegExp(value,'i')},
                {numDocumento:new RegExp(value,'i')},
                {direccion:new RegExp(value,'i')},
                {telefono:new RegExp(value,'i')},
                {email:new RegExp(value,'i')},
                ]
            ]
        })
    },

    personaGetListProveedor : async (req,res)=>{

    },


    personaPost: async (req,res)=>{
        const {tipoPersona,nombre,tipoDocumento,numDocumento,direccion,telefono,email} = req.body;
        const persona = Persona({tipoPersona,nombre,tipoDocumento,numDocumento,direccion,telefono,email});
        await persona.save();
        res.json({persona})
    },
    personaPut: async (req,res) =>{
        const {id} = req.params;
        const{_id,createdAt,estado,__v,tipoPersona,tipoDocumento,numDocumento,direccion,telefono,email,...resto} = req.body;//nombre
        
        const personaEstado = await Persona.findOne({_id:id})
        if (personaEstado.estado === 0) {return res.json({msg:'Persona desactivada'})}

        if (tipoDocumento) {resto.tipoDocumento = tipoDocumento;}
        if (numDocumento) {resto.numDocumento = numDocumento;}
        if (direccion) {resto.direccion = direccion;}
        if (telefono) {resto.telefono = telefono;}
        if (email) {resto.email = email;}

        const persona = await Persona.findByIdAndUpdate(id,resto);
        res.json({persona})

    },
    personaPutActivar: async (req,res) => {
        const {id} = req.params;
        const persona = await Persona.findByIdAndUpdate(id,{estado:1});
        res.json({persona})
    },
    personaPutDesactivar : async (req,res) =>{
        const {id} = req.params;
        const persona = await Persona.findByIdAndUpdate(id,{estado:0});
        res.json({persona})
    }
}
export default personasControllers