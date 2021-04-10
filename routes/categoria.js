//propiedad para crear las rutas
import {Router} from 'express';
//invocar las funciones que operan sobre la base de datos
import categoriasControllrs from '../controllers/categoria.js';
//chequear rutas antes de eviar al controlador
import {check} from 'express-validator';
//para validar ruta de get por ID 
import {validarCampo} from '../middlewares/validarCampos.js';
import {existeCategoriaById, existeCategoriaByNombre} from '../helpers/categorias.js';
import { validarJWR } from '../middlewares/validarJwt.js'
import { validarRol } from '../middlewares/validarRoles.js';
//crear redireccionador
const router = Router();

router.get('/',[
    //validar sesion
    validarJWR,
    //validar rol validarRol('ADMIN_ROL','VENDEDOR_ROL')
    validarRol('ALMACENISTA_ROL'),
    //Mostrar errores personalizados
    validarCampo],categoriasControllrs.categoriaGet);

router.get('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    //verificar que sea un ID
    check('id','ID no valido').isMongoId(),
    //verificar que existe el id
    check('id').custom(existeCategoriaById),
    validarCampo],categoriasControllrs.categoriaGetById);

router.post('/',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    //verificar que nombre no este vacio
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('descripcion','Descripcion obligatoria').not().isEmpty(),
    //verificar que no exista nombres duplicado
    check('nombre').custom(existeCategoriaByNombre),
    validarCampo],categoriasControllrs.categoriaPost);

router.put('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    //check('nombre','Nombre obligatorio').not().isEmpty(),
    check('nombre','nombre obligatorio').not().isEmpty(),
    check('nombre').custom(existeCategoriaByNombre),
    validarCampo],categoriasControllrs.categoriaPut);

router.put('/activar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo],categoriasControllrs.categoriaPutActivar);

router.put('/desactivar/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo],categoriasControllrs.categoriaPutDesactivar);

router.delete('/:id',[
    validarJWR,
    validarRol('ALMACENISTA_ROL'),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeCategoriaById),
    validarCampo
],categoriasControllrs.categoriaDelete);


export default router