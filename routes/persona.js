import {Router} from 'express';
import personasControllers from '../controllers/persona.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
import {check} from 'express-validator';
import { existePersonaByEmail, existePersonaById, existePersonaByNombre, existePersonaByTipo } from '../helpers/persona.js';
import  validarExistaArchivo  from '../middlewares/validar-exista-archivo.js';

const router = Router();

//ruta para agregar una persona
router.post('/',[
    validarJWR,
    validarRol(),
    check('tipoPersona','Tipo de persona obligatorio').not().isEmpty(),
    check('tipoPersona').custom(existePersonaByTipo),
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('nombre').custom(existePersonaByNombre),
    check('email','Email obligatorio').not().isEmpty(),
    check('email').custom(existePersonaByEmail),
    validarCampo
],personasControllers.personaPost)

//ruta para traer las personas
//validarRol("ALMACENISTA_ROL","VENDEDOR_ROL")
router.get('/',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    validarCampo
],personasControllers.personaGet)

//rutas para traer una persona por id
router.get('/byid/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.personaGetById)

//ruta para traer todos los clientes
router.get('/listClientes',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
    validarCampo
],personasControllers.personaGetListCliente)

//ruta para traer todos los proveedores
router.get('/listProveedores',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    validarCampo
],personasControllers.personaGetListProveedor)

//ruta para actualizar una persona por id
router.put('/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    check('nombre').custom(existePersonaByNombre),
    check('email').custom(existePersonaByEmail),
    validarCampo
],personasControllers.personaPut)

//ruta para activar una persona por id
router.put('/activar/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.personaPutActivar)

//ruta para desactivar una ruta por id
router.put('/desactivar/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.personaPutDesactivar)

//subir foto al servidor (nivel local)
router.post('/upload/:id',[
    validarJWR,
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarExistaArchivo,
    validarCampo
],personasControllers.cargarArhivo)

//ruta para traer una foto del servidor (nivel local)
router.get('/upload/:id',[
    validarJWR,
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.traerImagenes)

//ruta para subir foto a servicio de terceros
router.post('/uploadCloud/:id',[
    validarJWR,
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarExistaArchivo,
    validarCampo
],personasControllers.cargarArhivoCloud)

//traer la foto de cloudinary
router.get('/uploadCloud/:id',[
    validarJWR,
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.traerImagenesCloud)

export default router