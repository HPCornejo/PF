//Desestructurar - pedir solo lo necesario
const { request } = require('express');
const {miConexion} = require('../database/db')

//Estamos definiendo un objeto {objeto}
const productosAPI = {};

categoriasAPI.getTodosProductos = async (req,res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM producto');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                productos:rows
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Registro no encontrado",
                producto: []
            })
        }
    } catch (error) {
        next(error);
    }
}

categoriasAPI.getProductoPorId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const rows = await conexion.query('SELECT * FROM producto WHERE id = ?', [id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Producto encontrado",
                producto:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Producto no encontrado",
                producto:rows
            })
        }
    } catch (error) {
        next (error)
    }
}

categoriasAPI.deleteProductoPorId = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM Producto WHERE id = ?', [id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado:1,
                mensaje:"Producto eliminado"
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Producto no encontrado"
            })
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.postProducto = async(req=request,res,next)=>{
    try{
        const { descripcion, observaciones }=req.body;
        //Confirmacion de solicitud (des, obs)
        if(descripcion == undefined || observaciones == undefined){
            //Bad request - Solicitud incorrecta
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta o incompleta"
            }) 
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO productos(nombre, nombre_proveedor, precio,categoria_id:categoria_id,descripcion, observaciones) VALUES(?,?,?,?,?,?)', [descripcion, observaciones]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1, 
                    mensaje:"Producto creado",
                    categoria:{
                        id:resultado[0].insertId,
                        nombre:nombre,
                        nombre_proveedor:nombre_proveedor,
                        precio:precio,
                        categoria_id:categoria_id,
                        descripcion:descripcion,
                        observaciones:observaciones
                    }
                }) 
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"Producto no registrado. Algo salio mal :("
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

categoriasAPI.putProductoPorId = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { descripcion, observaciones } = req.body;
        if( descripcion == undefined || observaciones == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud oncorrecta o incompleta"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE producto SET descripcion = ?, observaciones = ? WHERE id = ?',[descripcion,observaciones,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Producto actualizado",
                        categoria:{
                            id:id,
                        nombre:nombre,
                        nombre_proveedor:nombre_proveedor,
                        precio:precio,
                        categoria_id:categoria_id,
                        descripcion:descripcion,
                        observaciones:observaciones}
                    })
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Producto no actualizado"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Producto no encontrado"
                })
            }
        }
    } catch (error) {
        next(error);        
    }
}

//Exportar el objeto
module.exports=productosAPI;
 
//CRUD (CREATE(id-POST)-READ(id-GET)-UPDATE(id-PUT)-DELETE(id-DELETE))
//Leer 1Xid o todas