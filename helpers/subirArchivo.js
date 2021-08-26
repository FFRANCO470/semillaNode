//nombre unico
import {v4 as uuidv4 } from 'uuid'
import path from 'path'
//saber donde esta instalada la app
import url from 'url'

//recibe los files que vengan en la peticon req
//el segundo parametro recibe las extensiones si no coloca unas por predetermiando
const subirArchivo=(files,extensionesValidas=['png','jpg','jpeg','gif'])=>{
    //la libreria trabaja con promesas
    return new Promise((resolve,reject)=>{
        //recibe el archivo
        const { archivo }=files;
        const nombreCortado = archivo.name.split('.');//separar por punto
        const extension = nombreCortado[nombreCortado.length-1];//ultima posicion

        //verificar si la extension es valida
        if(!extensionesValidas.includes(extension)){
            return reject(`La extension ${extension} no es permitida, solo ${extensionesValidas}`)
        }

        //nombre unico + la extension
        const nombreTemp = uuidv4()+"."+extension;

        //saber donde esta instalada la aplicacion con dirname
        //con require solo es colocar __dirname como esta version no es entonces toca crearlo
        //extrae la carpeta de donde esta instalado
        const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
        //ruta donde voy a subir
        const uploadPath = path.join(__dirname,'../uploads/',nombreTemp);
        //mover el archivo a esa carpeta
        archivo.mv(uploadPath,(err)=>{
            if(err){
                return reject(err)
            }
            return resolve(nombreTemp);
        })

    })
}

export{subirArchivo}