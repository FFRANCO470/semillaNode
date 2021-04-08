import {Router} from 'express';
import articulosControllers from '../controllers/articulo.js';
const router = Router();

router.get('/',articulosControllers.articuloGet);
router.get('/:id',articulosControllers.articuloGetById)
router.get('/categoria/:id',articulosControllers.articulosGetCategoria)
router.post('/',articulosControllers.articuloPost)
router.put('/:id',articulosControllers.articuloPut)
router.put('/activar/:id',articulosControllers.articuloPutActivar)
router.put('/desactivar/:id',articulosControllers.articuloPutDesactivar)

export default router 