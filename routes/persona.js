import {Router} from 'express';
import personasControllers from '../controllers/persona.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';

const router = Router();
router.get('/',[
    validarJWR,
    validarRol("ALMACENISTA_ROL","VENDEDOR_ROL"),
    validarCampo
],personasControllers.personaGet)



router.get('/:id',personasControllers.personaGetById)
router.post('/',personasControllers.personaPost)
router.put('/',personasControllers.personaPut)
router.put('/activar',personasControllers.personaPutActivar)
router.put('/desactivar',personasControllers.personaPutDesactivar)
export default router