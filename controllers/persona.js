import { subirArchivo } from '../helpers/subirArchivo.js';
import Persona from '../models/persona.js';
import path from 'path'
import url from 'url'
//manejar archivos dentro el servidor
import * as fs from 'fs'
//servicio de terceros 
import cloudinary from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL)


//tipoPersona(obliga), nombre(obliga)(unico) 50, email(unico obliga) 50, tipoDocumento 20, numDocumento 20, direccion 70, telefono 15, 
const personasControllers = {

    //agregar personas a la bd
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

    //traer personas de la bd
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

    //traer persona por id de la bd
    personaGetById : async (req,res)=>{
        const {id}=req.params;
        const persona = await Persona.findOne({_id:id})
        res.json({persona})
    },

    //traer todos los cliente de la bd
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

    //traer todos los proveedores de la bd
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

    //actualizar los campos de un persona por id en la bd
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

    //activar una persona
    personaPutActivar: async (req,res) => {
        const {id} = req.params;
        const persona = await Persona.findByIdAndUpdate(id,{estado:1});
        res.json({persona})
    },

    //desactivar una persona
    personaPutDesactivar : async (req,res) =>{
        const {id} = req.params;
        const persona = await Persona.findByIdAndUpdate(id,{estado:0});
        res.json({persona})
    },


    //agregar una imagen a una persona la imagen se almacena a nivel loca
    cargarArhivo : async(req,res)=>{
        const {id}=req.params;
        //como la imagen esta propensa a errores como el formato u otra cosa se coloca en try
        try {
            //subir la foto envia archivo y recibe nombre archivo
            const nombre = await subirArchivo(req.files,undefined)

            //persona a la que pertenece la foto
            let persona = await Persona.findOne({_id:id})

            //saber si tiene foto la persona
            if(persona.foto){
                //para saber donde esta la foto y borrarla
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                //para saber lo que voy a borrar
                const pathImage = path.join(__dirname,'../uploads/',persona.foto);
                //saber si existe el archivo
                if(fs.existsSync(pathImage)){
                    //unlinksync es promesa el otro no pero hacen lo mismo
                    //eliminar
                    fs.unlinkSync(pathImage)
                }
            }
            //guardar en la bd
            persona = await Persona.findByIdAndUpdate(id,{foto:nombre})
            //responder
            res.json({nombre})
        } catch (error) {
            res.status(400).json({error})
        }
    },

    //traer la imagen de la persona, la imagen esta en nivel local
    traerImagenes:async(req,res)=>{
        const {id} = req.params;
        try {
            let persona = await Persona.findOne({_id:id});
            //si existe el campo foto
            if(persona.foto){
                //para saber la ubicacion de la aplicacion
                const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
                //para saber la ubicacion de la foto
                const pathImage = path.join(__dirname,'../uploads/',persona.foto);
                //si existe la foto en el servidor retornala
                if(fs.existsSync(pathImage)){
                    return res.sendFile(pathImage)
                }
            }
            res.status(400).json({msg:'Falta imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },

    //colocar una foto a una pesona, la foto se almacena en la nuve en cloudinary
    cargarArhivoCloud:async(req,res)=>{
        const {id} = req.params;
        console.log(req);
        try {
            const {tempFilePath} = req.files.archivo;
            //subir la imagen
            const {secure_url}  = await cloudinary.uploader.upload(tempFilePath)

            let persona = await Persona.findOne({_id:id})
            
            if(persona.foto){
                const  nombreTemp = persona.foto.split('/');//dividirla url de la imagen por /
                const nombreArchivo = nombreTemp[nombreTemp.length-1]//tomar la ultima posicion, ahí esta el name de la img
                const [public_id] = nombreArchivo.split('.');//separar el name de la extension
                //destruir img del servidor 
                cloudinary.uploader.destroy(public_id)//eliminar la imagen por name que es unico por eso id
            }
            persona = await Persona.findByIdAndUpdate(id,{foto:secure_url})
            res.json({secure_url})
        } catch (error) {
            res.status(400).json({error})
        }
    },

    //traer imagen de cloudinary de una persona por id
    traerImagenesCloud:async(req,res)=>{
        const {id} = req.params;
        try {
            let persona = await Persona.findOne({_id:id});
            if(persona.foto){
                return res.json({url:persona.foto})

            }
            res.status(400).json({msg:'Falta imagen'})
            
        } catch (error) {
            res.status(400).json({error})
        }
    },
}
export default personasControllers