import {Router} from 'express';
import personasControllers from '../controllers/persona.js';

const router = Router();
router.get('/',personasControllers.personaGet)
router.get('/:id',personasControllers.personaGetById)
router.post('/',personasControllers.personaPost)
router.put('/',personasControllers.personaPut)
router.put('/activar',personasControllers.personaPutActivar)
router.put('/desactivar',personasControllers.personaPutDesactivar)
export default router