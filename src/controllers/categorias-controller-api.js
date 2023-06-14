const {request, response} = require('express');
const {miConexion} = require('../database/db')

const categoriasAPI = {};

categoriasAPI.getTodasCategorias = async (req,res,next)=>{
    try{
        const conexion = await miConexion();
        const [rows] = await conexion.querry('SELECT * FROM ');
        if(rows.lenght>0){
            res.status(200).json({
                estado:1,
                mensaje: "Registros encontrados",
                categoria:rows
            })
        }
        else{
            res.status(404).json({
                estado:0,
                mensaje:"Registro no encontrado",
                categoria:[]
            })
        }
    }catch(error){
        next(error);
    }
}
categoriasAPI.getTodasCategoriasPorId = async(req=request,res,next)=>{
    try{
        const{id}=req.params;
        const conexion = await miConexion();
        const [rows] = await conexion.querry('SELECT * FROM  WHERE id = ?', [id]);
        if(rows.lenght>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                categorias: rows[0]
            })
        }
        else{
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                categoria:rows
            })
        }
    }catch(error){
        next(error)
    }
}
categoriasAPI.deleteCategoriaPorId = async (req,res,next)=>{
    try{
        const{id} = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.querry('DELETE FROM --- WHERE id = ?',[id]);
        if(resultado[0].affectedRows>0){
            res.status({
                estado:1,
                mensaje:"Categoria eliminada"
            })
        }
        else{
            req.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada"
            })
        }
    }catch (error){
        next(error)
    }
}
categoriasAPI.postCategoria = async(req=request,res,next)=>{
    try{
        const { descripcion,categoria }=req.body;
        //Validar que el cuerpo de la solicitud exista descripcion y observaciones
        if(descripcion == undefined || categoria==undefined){
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1,
                    mensaje:"Categoria creada",
                    categorias:{
                        id:resultado[0].insertId,
                        descripcion:descripcion,
                        categorias:categoria
                    }
                });
            }
            else{
                res.status(500).json({
                    estado:0,
                    mensaje:"categoria NO registrada"
                })
            }
            //404 Bad request (Solicitud incorrecta)
            res.status(500).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Te faltan parametros"
    
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO CATEGORIA (descripcion, observaciones) VALUES (?,?)',[descripcion,observaciones]);
            
        }
        
    }catch(error){
        next (error)
    }
}
categoriasAPI.putCategoriaPorId = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const{ descripcion, categoria} = req.body;
        if(descripcion==undefined || categoria==undefined){
            res.status(404).json({
                estado:0,
                mensaje:"Solicitud incorrecta. Faltan parametros"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE CATEGORIA SET descripcion = ?, observaciones = ? WHERE id=?',[descripcion,observaciones,id]);
            if(resultado[0].affectedRows[0]>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        categorias:{
                            id:id,
                            descripcion:descripcion,
                            categorias:categoria
                        }
                    })
                    
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Categoria sin cambios"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Categoria no encontrada"
                })
            }
            res.json(resultado)
        }
    }catch (error){
        next(error);
    }
}

//Exportar el objeto
module.exports = categoriasAPI;