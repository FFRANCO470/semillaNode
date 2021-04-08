//validar rutas para devolvel los errores en la validacion
import {validationResult} from 'express-validator'
const validarCampo = (req,res,next)=>{
    //capturar errores en el array
    const errors = validationResult(req);
    if (! errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}
export {validarCampo}