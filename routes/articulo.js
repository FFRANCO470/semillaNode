import {Router} from 'express';
import articulosControllers from '../controllers/articulo.js';
import {check} from 'express-validator';
import { existeArticuloByCodigo, existeArticuloById, existeArticuloByNombre} from '../helpers/articulo.js';
import { existeCategoriaById } from '../helpers/categorias.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
const router = Router();

router.post('/',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),//validarRol("ALMACENISTA_ROL","VENDEDOR_ROL")
    check('codigo','Codigo obligatoria').not().isEmpty(),
    check('nombre','Nombre obligatoria').not().isEmpty(),
    check('categoria','Categoria obligatoria').not().isEmpty(),
    check('categoria','ID no valido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    check('codigo').custom(existeArticuloByCodigo),
    check('nombre').custom(existeArticuloByNombre),
    validarCampo
],articulosControllers.articuloPost)

router.get('/',[
    validarJWR,//validar sesion
    validarRol("ALMACENISTA_ROL","VENDEDOR_ROL"),
    validarCampo//Mostrar errores personalizados
],articulosControllers.articuloGet);

router.get('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),//es un id
    check('id').custom(existeArticuloById),//existe el id
    validarCampo
],articulosControllers.articuloGetById)

router.get('/categoria/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo
],articulosControllers.articulosGetCategoria)

//categoria,codigo,nombre,descripcion,precio,costo,stock
router.put('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampo
],articulosControllers.articuloPut)

router.put('/desactivar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampo
],articulosControllers.articuloPutDesactivar)

router.put('/activar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampo
],articulosControllers.articuloPutActivar)

export default router 