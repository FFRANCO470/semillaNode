//comunicarse con la base de datos
import {Router} from 'express';
//resivir lo que va a resivir o enviar a la base de datos
import categoriasControllrs from '../controllers/categoria.js'

//crear redireccionador
const router = Router();

router.get('/',categoriasControllrs.categoriaGet);
router.get('/:id',categoriasControllrs.categoriaGetById);
router.post('/',categoriasControllrs.categoriaPost);
router.put('/:id',categoriasControllrs.categoriaPut);
router.put('/activar/:id',categoriasControllrs.categoriaPutActivar);
router.put('/desactivar/:id',categoriasControllrs.categoriaPutDesactivar);
router.delete('/:id',categoriasControllrs.categoriaDelete);


export default router