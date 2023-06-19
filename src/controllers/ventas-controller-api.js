//Desestructurar - pedir solo lo necesario
const { request } = require('express');
const {miConexion} = require('../database/db')

//Estamos definiendo un objeto {objeto}
const ventasAPI = {};

ventasAPI.getTodasVentas = async (req,res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM ventas');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                ventas:rows
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Registro no encontrado",
                ventas: []
            })
        }
    } catch (error) {
        next(error);
    }
}

ventasAPI.getVentasPorId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const rows = await conexion.query('SELECT * FROM ventas WHERE id = ?', [id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                ventas:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Categoria no encontrada",
                ventas:rows
            })
        }
    } catch (error) {
        next (error)
    }
}

ventasAPI.deleteventasPorId = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM ventas WHERE id = ?', [id]);
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

ventasAPI.postventas = async(req=request,res,next)=>{
    try{
        const { cantidad, factura_id, producto_id }=req.body;
        //Confirmacion de solicitud (des, obs)
        if(cantidad == undefined || factura_id == undefined || producto_id == undefined){
            //Bad request - Solicitud incorrecta
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta o incompleta"
            }) 
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO ventas(cantidad, factura_id, producto_id) VALUES(?,?)', [cantidad, factura_id, producto_id]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1, 
                    mensaje:"Categoria creada",
                    ventas:{
                        id:resultado[0].insertId,
                        cantidad:cantidad,
                        factura_id:factura_id,
                        producto_id:producto_id
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

ventasAPI.putventasPorId = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { cantidad, factura_id, producto_id } = req.body;
        if( cantidad == undefined || factura_id == undefined || producto_id == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud oncorrecta o incompleta"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE ventas SET cantidad = ?, factura_id = ?, producto_id = ? WHERE id = ?',[cantidad,factura_id,producto_id,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        ventas:{
                            id:id,
                            cantidad:cantidad,
                            factura_id:factura_id,
                            producto_id:producto_id
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
module.exports=ventasAPI;
 
//CRUD (CREATE(id-POST)-READ(id-GET)-UPDATE(id-PUT)-DELETE(id-DELETE))
//Leer 1Xid o todas