import {Router} from 'express';
import {check} from 'express-validator';
import ventaControllers from '../controllers/venta.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
import { existeUsuarioById } from '../helpers/usuarios.js';
import { existePersonaById } from '../helpers/persona.js';
import {personaActiva,existeTipoComprobante,validarArticuloDetalle,existeVentaById} from '../helpers/venta.js'

const router = Router();

router.post('/',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
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
],ventaControllers.ventaPost)
router.get('/',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
    validarCampo
],ventaControllers.ventaGet)
router.get('/:id',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampo
],ventaControllers.ventaGetById)
router.put('/activar/:id',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampo
],ventaControllers.ventaPutActivar)
router.put('/desactivar/:id',[
    validarJWR,
    validarRol("VENDEDOR_ROL"),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeVentaById),
    validarCampo  
],ventaControllers.ventaPutDesactivar)

export default router