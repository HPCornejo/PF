//Desestructurar - pedir solo lo necesario
const { request } = require('express');
const {miConexion} = require('../database/db');
const { test } = require('node:test');

//Estamos definiendo un objeto {objeto}
const proveedoresAPI = {};

proveedoresAPI.getTodosProveedores = async (req,res,next)=>{
    try {
        const conexion = await miConexion();
        const [rows] = await conexion.query('SELECT * FROM proveedores');
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"Registros encontrados",
                proveedores:rows
            })
        }else{
            res.status(404).json({
                estado: 0,
                mensaje: "Registro no encontrado",
                proveedores: []
            })
        }
    } catch (error) {
        next(error);
    }
}

proveedoresAPI.getProveedoresPorId = async (req=request,res,next)=>{
    try {
        const {id} = req.params;
        const conexion = await miConexion();
        const rows = await conexion.query('SELECT * FROM proveedores WHERE id = ?', [id]);
        if(rows.length>0){
            res.status(200).json({
                estado:1,
                mensaje:"proveedor encontrada",
                proveedores:rows[0]
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"proveedor no encontrada",
                proveedores:rows
            })
        }
    } catch (error) {
        next (error)
    }
}

proveedoresAPI.deleteProveedoresPorId = async(req,res,next)=>{
    try{
        const { id } = req.params;
        const conexion = await miConexion();
        const resultado = await conexion.query('DELETE FROM proveedores WHERE id = ?', [id]);
        if(resultado[0].affectedRows>0){
            res.status(200).json({
                estado:1,
                mensaje:"proveedor eliminada"
            })
        }else{
            res.status(404).json({
                estado:0,
                mensaje:"proveedor no encontrada"
            })
        }
    } catch (error) {
        next(error)
    }
}

proveedoresAPI.postProveedores = async(req=request,res,next)=>{
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
            const resultado = await conexion.query('INSERT INTO proveedores(id, nombre, telefono) VALUES(?,?)', [id, nombre, telefono]);
            if(resultado[0].affectedRows>0){
                res.status(201).json({
                    estado:1, 
                    mensaje:"proveedor creado",
                    proveedor:{
                        id:resultado[0].insertId,
                        nombre:nombre,
                        telefono:telefono
                    }
                })
            }else{
                res.status(500).json({
                    estado:0,
                    mensaje:"proveedor no registrado. Algo salio mal :("
                })
            }
        }
    } catch (error) {
        next(error)
    }
}

proveedoresAPI.putProveedoresPorId = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const { nombre, telefono } = req.body;
        if( nombre == undefined || telefono == undefined){
            res.status(400).json({
                estado:0,
                mensaje:"Solicitud incorrecta o incompleta"
            })
        }else{
            const conexion = await miConexion();
            const resultado = await conexion.query('UPDATE proveedores SET nombre = ?, telefono = ? WHERE id = ?',[nombre,telefono,id]);
            if(resultado[0].affectedRows>0){
                if(resultado[0].changedRows>0){
                    res.status(200).json({
                        estado:1,
                        mensaje:"Proveedor actualizado",
                        categoria:{
                            id:id,
                            nombre:nombre,
                            telefono:telefono
                        }
                    })
                }else{
                    res.status(200).json({
                        estado:0,
                        mensaje:"Proveedor no actualizado"
                    })
                }
            }else{
                res.status(404).json({
                    estado:0,
                    mensaje:"Proveedor no encontrada"
                })
            }
        }
    } catch (error) {
        next(error);        
    }
}

//Exportar el objeto
module.exports=proveedoresAPI;
 
//CRUD (CREATE(id-POST)-READ(id-GET)-UPDATE(id-PUT)-DELETE(id-DELETE))
//Leer 1Xid o todas