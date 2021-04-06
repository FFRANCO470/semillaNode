import {Router} from 'express';
import usuarioController from '../controllers/usuario.js';
import usuario from '../controllers/usuario.js'

const router = Router();

router.get('/',usuarioController.usuarioGet);
router.get('/:id',usuarioController.usuarioGetId);
router.post('/',usuarioController.usuarioPost);
router.post('/login',usuarioController.login)
router.put('/:id',usuarioController.usuarioPut);
router.put('/activar/:id',usuarioController.usuarioPutActivar);
router.put('/desactivar/:id',usuarioController.usuarioPutDesactivar);

export default router