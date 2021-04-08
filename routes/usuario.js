import {Router} from 'express';
import usuarioController from '../controllers/usuario.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
import {check} from 'express-validator';
import { existeUsuarioByEmail, existeUsuarioById, existeUsuarioByName, existeUsuarioByRol } from '../helpers/usuarios.js';

const router = Router();

router.get('/',[
    //validar sesion
    validarJWR,
    //validar rol
    validarRol(),
    //mostrar errores personalizados
    validarCampo],usuarioController.usuarioGet);

router.get('/:id',[
    validarJWR,
    validarRol(),
    //verificar que sea id
    check('id','ID no valido').isMongoId(),
    //verificar existencia del id
    check('id').custom(existeUsuarioById),
    validarCampo],usuarioController.usuarioGetId);

router.post('/',[
    //verificar que los campos no esten vacios
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('email','Correo obligatorio').not().isEmpty(),
    check('password','Clave obligatoria').not().isEmpty(),
    check('rol','Rol obligatorio').not().isEmpty(),
    //verificar que no existan duplicados
    check('nombre').custom(existeUsuarioByName),
    check('email').custom(existeUsuarioByEmail),
    check('rol').custom(existeUsuarioByRol),
    validarCampo],usuarioController.usuarioPost);

router.post('/login',usuarioController.login);

router.put('/:id',[
    validarJWR,
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('nombre').custom(existeUsuarioByName),
    check('email').custom(existeUsuarioByEmail),
    validarCampo],usuarioController.usuarioPut);

router.put('/activar/:id',[
    
],usuarioController.usuarioPutActivar);
router.put('/desactivar/:id',usuarioController.usuarioPutDesactivar);

export default router