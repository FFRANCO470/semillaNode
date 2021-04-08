import {Router} from 'express';
import compraControllers from '../controllers/compra.js';

const router = Router();

router.get('/',compraControllers.compraGet)
router.get('/:id',compraControllers.compraGetById)
router.post('/',compraControllers.compraPost)
router.put('/:id',compraControllers.compraPut)
router.put('/activar/:id',compraControllers.compraPutActivar)
router.put('/desactivar/:id',compraControllers.compraPutDesactivar)

export default router