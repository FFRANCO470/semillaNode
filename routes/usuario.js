import {Router} from 'express';
import usuarioController from '../controllers/usuario.js';
import { validarCampo } from '../middlewares/validarCampos.js';
import { validarJWR } from '../middlewares/validarJwt.js';
import { validarRol } from '../middlewares/validarRoles.js';
import {check} from 'express-validator';
import { existeUsuarioByEmail, existeUsuarioById, existeUsuarioByName, existeUsuarioByRol } from '../helpers/usuarios.js';

const router = Router();

router.post('/',[
    //verificar que los campos no esten vacios
    check('nombre','Nombre obligatorio').not().isEmpty(),
    check('email','Email obligatorio').not().isEmpty(),
    check('password','Clave obligatoria').not().isEmpty(),
    check('rol','Rol obligatorio').not().isEmpty(),
    //verificar del contenido
    check('nombre').custom(existeUsuarioByName),
    check('email').custom(existeUsuarioByEmail),
    check('rol').custom(existeUsuarioByRol),
    validarCampo
],usuarioController.usuarioPost);

router.post('/login',[
    check('email','Email obligatorio').not().isEmpty(),
    check('password','Clave obligatoria').not().isEmpty(),
    validarCampo
],usuarioController.login);

router.get('/',[
    //validar sesion
    validarJWR,
    //validar rol
    validarRol(),
    //mostrar errores personalizados
    validarCampo
],usuarioController.usuarioGet);

router.get('/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampo
],usuarioController.usuarioGetId);

router.put('/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    check('nombre').custom(existeUsuarioByName),
    check('email').custom(existeUsuarioByEmail),
    validarCampo
],usuarioController.usuarioPut);

router.put('/activar/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampo
],usuarioController.usuarioPutActivar);
router.put('/desactivar/:id',[
    validarJWR,
    validarRol(),
    check('id','ID no valido').isMongoId(),
    check('id').custom(existeUsuarioById),
    validarCampo
],usuarioController.usuarioPutDesactivar);

export default router