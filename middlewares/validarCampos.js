import {validationResult} from 'express-validator'//validar rutas para devolvel los errores en la validacion
const validarCampo = (req,res,next)=>{
    const errors = validationResult(req);//capturar errores en el array
    if (! errors.isEmpty()) {return res.status(400).json(errors);}
    next();
}
export {validarCampo}