import {Router} from 'express';
import { check } from 'express-validator';
import compraControllers from '../controllers/compra.js';
import { existeTipoComprobante, personaActiva, existeCompraById,validarArticuloDetalle } from '../helpers/compra.js';
import { existeUsuarioById } from '../helpers/usuarios.js';
import { existePersonaById } from '../helpers/persona.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
const router = Router();
//usuario, persona, tipoComprobante, serieComprobante(7), numComprobante(10), impuesto, total, detalles
router.post('/',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    check('usuario','Usuario obligatorio').not().isEmpty(),
    check('usuario','ID de usuario no valido').isMongoId(),
    check ('usuario').custom(existeUsuarioById),
    check('persona','Persona obligatorio').not().isEmpty(),
    check('persona','ID de persona no valido').isMongoId(),
    check ('persona').custom(existePersonaById),
    check('persona').custom(personaActiva),
    check('tipoComprobante','tipoComprobante obligatorio').not().isEmpty(),
    check ('tipoComprobante').custom(existeTipoComprobante),
    check('serieComprobante','serieComprobante obligatorio').not().isEmpty(),
    check('numComprobante','numComprobante obligatorio').not().isEmpty(),
    check('impuesto','impuesto obligatorio').not().isEmpty(),
    check('total','total obligatorio').not().isEmpty(),
    check('detalles','detalles obligatorio').not().isEmpty(),
    check('detalles').custom(validarArticuloDetalle),
    validarCampo
],compraControllers.compraPost)
router.get('/',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    validarCampo
],compraControllers.compraGet)
router.get('/:id',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampo
],compraControllers.compraGetById)

router.put('/activar/:id',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampo
],compraControllers.compraPutActivar)

router.put('/desactivar/:id',[
    validarJWR,
    validarRol("ALMACENISTA_ROL"),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCompraById),
    validarCampo
],compraControllers.compraPutDesactivar)

export default router