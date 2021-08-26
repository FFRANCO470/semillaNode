const validarExistaArchivo =(req,res,next)=>{
    //validar que no este vacio, validar que sea un objeto, validar que venta la variable archivo
    if(!req.files || Object.keys(req.files).length===0 || !req.files.archivo ){
        return res.status(400).json({msg:"No hay archivo en la peticion"})

    }

    next();
}

export default validarExistaArchivo