const validarRol = (...roles) =>{
//recibe el req.usuario = usuario
    return (req,res,next)=>{
        //si dentro de roles no esta el rol del usuario enviar error 
        if(!(roles.includes(req.usuario.rol) || req.usuario.rol==='ADMIN_ROL')){
            return res.status(401).json({msg:`El servicio requiere roles de ${roles}  administrador`})
        }
        next();
    }
}
export {validarRol}