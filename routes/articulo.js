import {Router} from 'express';
import articulosControllers from '../controllers/articulo.js';
import {check} from 'express-validator';
import { existeArticuloByCodigo, existeArticuloById, existeArticuloByNombre} from '../helpers/articulo.js';
import { existeCategoriaById } from '../helpers/categorias.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
const router = Router();

router.get('/',[
    //validar sesion
    validarJWR,
    //validar rol validarRol('ADMIN_ROL','VENDEDOR_ROL')
    validarRol("ALMACENISTA_ROL","VENDEDOR_ROL"),
    //Mostrar errores personalizados
    validarCampo],articulosControllers.articuloGet);

router.get('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    //es un id
    check('id','ID no valido').isMongoId(),
    //existe el id
    check('id').custom(existeArticuloById),
    validarCampo],articulosControllers.articuloGetById)

router.get('/categoria/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo],articulosControllers.articulosGetCategoria)

router.post('/',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    //campos oblgatorias
    check('codigo','Codigo obligatoria').not().isEmpty(),
    check('nombre','Nombre obligatoria').not().isEmpty(),
    check('categoria','Categoria obligatoria').not().isEmpty(),
    check('categoria','ID no valido').isMongoId(),
    check('categoria').custom(existeCategoriaById),
    //no se repitan
    check('codigo').custom(existeArticuloByCodigo),
    check('nombre').custom(existeArticuloByNombre),
    validarCampo],articulosControllers.articuloPost)

//categoria,codigo,nombre,descripcion,precio,costo,stock
router.put('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    //existencias
    check('id').custom(existeArticuloById),
    check('codigo').custom(existeArticuloByCodigo),
    check('nombre').custom(existeArticuloByNombre),
    validarCampo],articulosControllers.articuloPut)


router.put('/desactivar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampo
],articulosControllers.articuloPutDesactivar)

router.put('/activar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL','VENDEDOR_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeArticuloById),
    validarCampo
],articulosControllers.articuloPutActivar)

export default router 