//comunicarse con la base de datos
import {Router} from 'express';
//resivir lo que va a resivir o enviar a la base de datos
import categoriasControllrs from '../controllers/categoria.js';
//chequear rutas antes de eviar al controlador
import {check} from 'express-validator';
//para validar ruta de get por ID 
import {validarCampo} from '../middlewares/validarCampos.js';
import {existeCategoriaById, existeCategoriaByNombre} from '../helpers/categorias.js';
import { validarJWR } from '../middlewares/validarJwt.js'
//crear redireccionador
const router = Router();

router.get('/',[
    //si inicia sesion bien
    validarJWR,
    //absorver errores
    validarCampo
],categoriasControllrs.categoriaGet);

router.get('/:id',[
    //si inicia sesion bien
    validarJWR,
    //verificar que sea un ID
    check('id','ID no valido').isMongoId(),
    //verificar que existe el id
    check('id').custom(existeCategoriaById),
    //absorver errores
    validarCampo
],categoriasControllrs.categoriaGetById);

router.post('/',[
    //si inicia sesion bien
    validarJWR,
    //verificar que nombre no este vacio
    check('nombre','Nombre obligatorio').not().isEmpty(),
    //verificar que no exista nombres duplicados
    check('nombre').custom(existeCategoriaByNombre),
    //absorver erroes
    validarCampo
],categoriasControllrs.categoriaPost);

router.put('/:id',[
    //si inicia sesion bien
    validarJWR,
    //verificar que sea un ID
    check('id','ID no valido').isMongoId(),
    //verificar que existe el id
    check('id').custom(existeCategoriaById),
    //verificar que no exista nombres duplicados
    check('nombre').custom(existeCategoriaByNombre),
    //absorver errores
    validarCampo
],categoriasControllrs.categoriaPut);

router.put('/activar/:id',[
    //si inicia sesion bien
    validarJWR,
    //verificar que sea un ID
    check('id','ID no valido').isMongoId(),
    //verificar que existe el id
    check('id').custom(existeCategoriaById),
    //absorver errores
    validarCampo
],categoriasControllrs.categoriaPutActivar);

router.put('/desactivar/:id',[
    //si inicia sesion bien
    validarJWR,
    //verificar que sea un ID
    check('id','ID no valido').isMongoId(),
    //verificar que existe el id
    check('id').custom(existeCategoriaById),
    //absorver errores
    validarCampo
],categoriasControllrs.categoriaPutDesactivar);

router.delete('/:id',[
    //si inicia sesion bien
    validarJWR,
    //verificar que sea un ID
    check('id','ID no valido').isMongoId(),
    //verificar que existe el id
    check('id').custom(existeCategoriaById),
    //absorver errores
    validarCampo
],categoriasControllrs.categoriaDelete);


export default router