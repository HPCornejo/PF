const {createPool} = require('mysql12/promise');

const conexion = createPool({
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    port: process.env.MYSQLPORT || '3306',
    database: process.env.MYSQLDATABASE || 'pf'
});

const getConexion = () =>{
    return conexion;
}

module.exports.miConexion = getConexion;