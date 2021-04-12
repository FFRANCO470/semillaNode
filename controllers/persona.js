import Persona from '../models/persona.js'


//tipoPersona(obliga), nombre(obliga)(unico) 50, email(unico obliga) 50, tipoDocumento 20, numDocumento 20, direccion 70, telefono 15, 
const personasControllers = {

    personaPost: async (req,res)=>{
        const {tipoPersona,nombre,tipoDocumento,numDocumento,direccion,telefono,email} = req.body;
        if(nombre.length>50){return res.status(400).json({msg:'Nombre mayor 50 caracteres'})}
        if(email.length>50){return res.status(400).json({msg:'Email mayor 50 caracteres'})}
        if(tipoDocumento){
            if(tipoDocumento.length>20){return res.status(400).json({msg:'tipoDocumento mayor 20 caracteres'})}
        }
        if(numDocumento){
            if(numDocumento.length>20){return res.status(400).json({msg:'numDocumento mayor 20 caracteres'})}
        }
        if(direccion){
            if(direccion.length > 70){return res.status(400).json({msg:'direccion mayor 70 caracteres'})}
        }
        if(telefono){
            if(telefono.length > 15){return res.status(400).json({msg:'telefono mayor 15 caracteres'})}
        }
        const persona = Persona({tipoPersona,nombre,tipoDocumento,numDocumento,direccion,telefono,email});
        await persona.save();
        res.json({persona})
    },
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
        const persona = await Persona
            .find(
                {$and:[{tipoPersona:"cliente"},
                    {$or:[
                        {nombre:new RegExp(value,'i')},
                        {tipoDocumento:new RegExp(value,'i')},
                        {numDocumento:new RegExp(value,'i')},
                        {direccion:new RegExp(value,'i')},
                        {telefono:new RegExp(value,'i')},
                        {email:new RegExp(value,'i')},
                        ]
                    } 
                    ]
                }     
            )
        res.json({persona})
    },
    personaGetListProveedor : async (req,res)=>{
        const value = req.query.value;
        const persona = await Persona
            .find(
                {$and:[{tipoPersona:"proveedor"},
                    {$or:[
                        {nombre:new RegExp(value,'i')},
                        {tipoDocumento:new RegExp(value,'i')},
                        {numDocumento:new RegExp(value,'i')},
                        {direccion:new RegExp(value,'i')},
                        {telefono:new RegExp(value,'i')},
                        {email:new RegExp(value,'i')},
                        ]
                    } 
                    ]
                }     
            )
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