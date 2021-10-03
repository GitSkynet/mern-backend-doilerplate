/*
Creación de la conexión a MySQL a través db.js,
donde le pasamos la conexión a la base de datos
y manejamos los errores tirando mensajes por
consola para el desarrollador
*/
const mysql = require('mysql');
const { promisify } = require('util');

const { ddbb } = require('./db.js');
console.log(ddbb)
const pool = mysql.createPool(ddbb);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
    console.log(`==> 📊  Connection to ${ddbb.database} succesfull`);
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;