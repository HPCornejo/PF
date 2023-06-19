//Desestructurar - pedir solo lo necesario
const { request } = require('express');
const {miConexion} = require('../database/db')

//Estamos definiendo un objeto {objeto}
const facturasAPI = {};

facturasAPI.getTodasFacturas = async (req,res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM facturas');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                facturas:rows
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Registro no encontrado",
                facturas: []
            })
        }
    } catch (error) {
        next(error);
    }
}

facturasAPI.getFacturasPorId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const rows = await conexion.query('SELECT * FROM facturas WHERE id = ?', [id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Categoria encontrada",
                facturas:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"Facturas no encontrada",
                facturas:rows
            })
        }
    } catch (error) {
        next (error)
    }
}

facturasAPI.deleteCategoriaPorId = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM facturas WHERE id = ?', [id]);
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

facturasAPI.postFacturas = async(req=request,res,next)=>{
    try{
        const { nombre, cliente_id }=req.body;
        //Confirmacion de solicitud (des, obs)
        if(nombre == undefined || cliente_id == undefined){
            //Bad request - Solicitud incorrecta
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta o incompleta"
            }) 
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('INSERT INTO facturas(nombre, cliente_id) VALUES(?,?)', [nombre, cliente_id]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1, 
                    mensaje:"Categoria creada",
                    facturas:{
                        id:resultado[0].insertId,
                        nombre:nombre,
                        cliente_id:cliente_id
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

facturasAPI.putFacturasPorId = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { nombre, cliente_id } = req.body;
        if( nombre == undefined || cliente_id == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud oncorrecta o incompleta"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE facturas SET nombre = ?, cliente_id = ? WHERE id = ?',[nombre,cliente_id,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Categoria actualizada",
                        facturas:{
                            id:id,
                            nombre:nombre,
                            cliente_id:cliente_id
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
module.exports=facturasAPI;
 
//CRUD (CREATE(id-POST)-READ(id-GET)-UPDATE(id-PUT)-DELETE(id-DELETE))
//Leer 1Xid o todas