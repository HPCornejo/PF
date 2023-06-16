//Desestructurar - pedir solo lo necesario
const { request } = require('express');
const {miConexion} = require('../database/db')

//Estamos definiendo un objeto {objeto}
const categoriasAPI = {};

categoriasAPI.getTodasCategorias = async (req,res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM categorias');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                categorias:rows
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Registro no encontrado",
                categorias: []
            })
        }
    } catch (error) {
        next(error);
    }
}

categoriasAPI.getCategoriaPorNombre = async (req=request,res,next)=>{
    try {
        const {categoria} = req.params;
        const conexion = await miConexion();
        const rows = await conexion.query('SELECT * FROM categorias WHERE categoria = ?', [categoria]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                categoria:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                categoria:rows
            })
        }
    } catch (error) {
        next (error)
    }
}

categoriasAPI.deleteCategoriaPorNombre = async(req,res,next)=>{
    try{
        const { categoria } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categoria WHERE categoria = ?', [categoria]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria eliminada"
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada"
            })
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.postCategoria = async(req=request,res,next)=>{
    try{
        const { categoria, descripcion }=req.body;
        //Confirmacion de solicitud (des, obs)
        if(categoria == undefined || descripcion == undefined){
            //Bad request - Solicitud incorrecta
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta o incompleta"
            }) 
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO categoria(categoria, descripcion) VALUES(?,?)', [categoria, descripcion]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1, 
                    mensaje:"Categoria creada",
                    categoria:{
                        categoria:categoria,
                        descripcion:descripcion
                    }
                })
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Categoria no registrada. Algo salio mal :("
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.putCategoriaPorNombre = async(req,res,next)=>{
    try {
        const { categoria } = req.params;
        const { descripcion } = req.body;
        if( descripcion == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud oncorrecta o incompleta"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categoria SET descripcion = ? WHERE categoria = ?',[categoria,descripcion]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        categoria:{
                            categoria:categoria,
                            descripcion:descripcion,
                        }
                    })
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Categoria no actualizada"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Categoria no encontrada"
                })
            }
        }
    } catch (error) {
        next(error);        
    }
}

//Exportar el objeto
module.exports=categoriasAPI;
 
//CRUD (CREATE(id-POST)-READ(id-GET)-UPDATE(id-PUT)-DELETE(id-DELETE))
//Leer 1Xid o todas