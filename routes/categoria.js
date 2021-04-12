//propiedad para crear las rutas
import {Router} from 'express';
//invocar las funciones que operan sobre la base de datos
import categoriasControllrs from '../controllers/categoria.js';
//chequear rutas antes de eviar al controlador
import {check} from 'express-validator';
//para validar ruta de get por ID 
import {validarCampo} from '../middlewares/validarCampos.js';
import {existeCategoriaById, existeCategoriaByNombre, contarCategoriaNombre, contarCategoriaDescripcion} from '../helpers/categorias.js';
import { validarJWR } from '../middlewares/validarJwt.js'
import { validarRol } from '../middlewares/validarRoles.js';
//crear redireccionador
const router = Router();
router.post('/',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('nombre','Nombre obligatorio').not().isEmpty(),//verificar que nombre no este vacio
    check('descripcion','Descripcion obligatoria').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),//verificar que no exista nombres duplicado
    validarCampo
],categoriasControllrs.categoriaPost);

router.get('/',[
    //validar sesion
    validarJWR,
    //validar rol validarRol('ADMIN_ROL','VENDEDOR_ROL')
    validarRol('ALMACENISTA_ROL'),
    //Mostrar errores personalizados
    validarCampo
],categoriasControllrs.categoriaGet);

router.get('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),//verificar que sea un ID
    check('id').custom(existeCategoriaById),//verificar que existe el id
    validarCampo
],categoriasControllrs.categoriaGetById);

router.put('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    //check('nombre','Nombre obligatorio').not().isEmpty(),
    check('nombre','nombre obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampo
],categoriasControllrs.categoriaPut);

router.put('/activar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo
],categoriasControllrs.categoriaPutActivar);

router.put('/desactivar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo
],categoriasControllrs.categoriaPutDesactivar);

router.delete('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo
],categoriasControllrs.categoriaDelete);


export default router