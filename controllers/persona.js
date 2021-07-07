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
        const persona = await Persona.findOne({_id:id})
        res.json({persona})
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
        const{_id,createdAt,estado,__v,tipoPersona, nombre, email, tipoDocumento,numDocumento,direccion,telefono} = req.body;//nombre   
        const personaEstado = await Persona.findOne({_id:id})
        if (personaEstado.estado === 0) {return res.status(400).json({msg:'Persona desactivada'})}
        const resto ={}
        if (tipoPersona) {
            if (tipoPersona !== "cliente") {
                if (tipoPersona !== "proveedor" ) {
                    return res.status(400).json({msg:'Solo tipo cliente o proveedor'})
                }else {resto.tipoPersona = tipoPersona}
            }else {resto.tipoPersona = tipoPersona}
        }
        if(nombre === "") {return res.status(400).json({msg:'nombre vacio'})}
        if (nombre) {
            if (nombre > 50) {return res.status(400).json({msg:'nombre mayor 50 caractere'})}
            resto.nombre = nombre;
        }
        if(email === "") {return res.status(400).json({msg:'email vacio'})}
        if (email) {
            if (email > 50) {return res.status(400).json({msg:'email mayor 50 caractere'})}
            resto.email = email;
        }
        if(tipoDocumento === "") {return res.status(400).json({msg:'tipoDocumento vacio'})}
        if (tipoDocumento) {
            if (tipoDocumento > 20) {return res.status(400).json({msg:'tipoDocumento mayor 20 caractere'})}
            resto.tipoDocumento = tipoDocumento;
        }
        if(numDocumento === "") {return res.status(400).json({msg:'numDocumento vacio'})}
        if (numDocumento) {
            if (numDocumento > 20) {return res.status(400).json({msg:'numDocumento mayor 20 caractere'})}
            resto.numDocumento = numDocumento;
        }
        if(direccion === "") {return res.status(400).json({msg:'direccion vacio'})}
        if (direccion) {
            if (direccion > 70) {return res.status(400).json({msg:'direccion mayor 70 caractere'})}
            resto.direccion = direccion;
        }
        if(telefono === "") {return res.status(400).json({msg:'telefono vacio'})}
        if (telefono) {
            if (telefono > 15) {return res.status(400).json({msg:'telefono mayor 15 caractere'})}
            resto.telefono = telefono;
        }
        if(Object.entries(resto).length==0){return res.status(400).json({msg:'No actualizo nada'})}
        const articulo = await Persona.findByIdAndUpdate(id,resto)
        res.json({articulo})
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