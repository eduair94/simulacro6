/**
 * Configuración de conexión a MongoDB
 * 
 * Este archivo maneja la conexión a la base de datos MongoDB
 * usando Mongoose como ODM (Object Document Mapper).
 */

const mongoose = require('mongoose');

/**
 * Función para conectar a MongoDB
 * 
 * Explicación:
 * - mongoose.connect(): Establece conexión con MongoDB
 * - process.env.MONGODB_URI: Lee la URI de las variables de entorno
 * - Las opciones ya no son necesarias en versiones recientes de Mongoose
 * 
 * @returns {Promise} - Promesa de la conexión
 */
const connectDB = async () => {
    try {
        // Intentamos conectar a MongoDB usando la URI del archivo .env
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
        
        return conn;
    } catch (error) {
        console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
        // En caso de error, terminamos el proceso
        process.exit(1);
    }
};

module.exports = connectDB;
