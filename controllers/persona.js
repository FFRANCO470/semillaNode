import Persona from '../models/persona.js'

const personasControllers = {
    personaGet: async (req,res)=>{
        const value = req.query.value;
        //buscar y devolver como un array de objetos
        const persona = await Persona.find({
            $or:[
                {tipoPersona:new RegExp(value,'i')},
                {nombre:new RegExp(value,'i')},
                {direccion:new RegExp(value,'i')}
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