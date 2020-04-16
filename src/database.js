const mysql = require("mysql");
// adicionamos la funcionalidad de promesas o callback
const { promisify } = require("util");
const { database } = require("./keys");

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL CONNECTION LOST") {
      console.error("CONEXION CON BASE DE DATOS FUE CERRADA");
    }

    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("LA BASE DE DATOS CONTIENE DEMASIADAS SESIONES ABIERTAS");
    }

    if (err.code === "ECONBREFUSED") {
      console.error("CONEXION CON LA BASE DE DATOS HA SIDO RECHAZADA");
    }
  }

  if (connection) connection.release();
  console.log("CONEXION CON BASE DE DATOS EXITOSA...!");
  return;
});

// promisify pool query -> estamos convirtiendo a promesas todos los requerimientos de consultas (query)
pool.query = promisify(pool.query);

module.exports = pool;
