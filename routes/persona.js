import {Router} from 'express';
import personasControllers from '../controllers/persona.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
import {check} from 'express-validator';
import { existePersonaByEmail, existePersonaById, existePersonaByNombre, existePersonaByTipo } from '../helpers/persona.js';

const router = Router();

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

//validarRol("ALMACENISTA_ROL","VENDEDOR_ROL")
router.get('/',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    validarCampo
],personasControllers.personaGet)

router.get('/byid/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.personaGetById)

router.get('/listClientes',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
    validarCampo
],personasControllers.personaGetListCliente)

router.get('/listProveedores',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    validarCampo
],personasControllers.personaGetListProveedor)

router.put('/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    check('nombre').custom(existePersonaByNombre),
    check('email').custom(existePersonaByEmail),
    validarCampo
],personasControllers.personaPut)

router.put('/activar/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.personaPutActivar)

router.put('/desactivar/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existePersonaById),
    validarCampo
],personasControllers.personaPutDesactivar)


export default router