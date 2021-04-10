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

    },
    personaPost: async (req,res)=>{
        const {tipoPersona,nombre,tipoDocumento,numDocumento,direccion} = req.body;
        const persona = Persona({tipoPersona,nombre,tipoDocumento,numDocumento,direccion});
        await persona.save();
        res.json({persona})
    },
    personaPut: async (req,res) =>{

    },
    personaPutActivar: async (req,res) => {

    },
    personaPutDesactivar : async (req,res) =>{
        
    }
}
export default personasControllers