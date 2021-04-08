import {Router} from 'express'
import ventaControllers from '../controllers/venta.js';

const router = Router();

router.get('/',ventaControllers.ventaGet)
router.get('/:id',ventaControllers.ventaGetById)
router.post('/',ventaControllers.ventaPost)
router.put('/:id',ventaControllers.ventaPut)
router.put('/activar/:id',ventaControllers.ventaPutActivar)
router.put('/desactivar/:id',ventaControllers.ventaPutDesactivar)

export default router