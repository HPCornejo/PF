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

categoriasAPI.getCategoriaPorId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const rows = await conexion.query('SELECT * FROM categorias WHERE id = ?', [id]);
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

categoriasAPI.deleteCategoriaPorId = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM categorias WHERE id = ?', [id]);
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
            const resultado = await conexion.query('INSERT INTO categorias(categoria, descripcion) VALUES(?,?)', [categoria, descripcion]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1, 
                    mensaje:"Categoria creada",
                    categoria:{
                        id:resultado[0].insertId,
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

categoriasAPI.putCategoriaPorId = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { categoria, descripcion } = req.body;
        if( categoria == undefined || descripcion == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud oncorrecta o incompleta"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE categorias SET categoria = ?, descripcion = ? WHERE id = ?',[categoria,descripcion,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        categoria:{
                            id:id,
                            categoria:categoria,
                            descripcion:descripcion
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