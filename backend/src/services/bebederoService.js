/**
 * ========================================
 * PUNTO 3: CAPA DE CONSULTAS A BASE DE DATOS (6 pts.)
 * ========================================
 * 
 * Este archivo implementa la capa de servicios que realiza las consultas
 * a la base de datos MongoDB a través de Mongoose.
 * 
 * Funciones implementadas:
 * - getAllBebederos(): Obtiene todos los bebederos
 * - createBebedero(data): Crea un nuevo bebedero
 * - updateEstado(id, nuevoEstado): Actualiza el estado de un bebedero por ID
 * 
 * Esta capa actúa como intermediaria entre los controladores y el modelo,
 * encapsulando toda la lógica de acceso a datos.
 */

const Bebedero = require('../models/Bebedero');

/**
 * Obtiene todos los bebederos de la base de datos
 * 
 * Explicación:
 * - Bebedero.find({}): Busca todos los documentos sin filtro (objeto vacío)
 * - .lean(): Convierte los documentos de Mongoose a objetos JavaScript planos
 *            (mejor rendimiento para lectura)
 * - await: Espera la resolución de la promesa
 * 
 * @returns {Promise<Array>} - Array con todos los bebederos
 */
const getAllBebederos = async () => {
    try {
        // find({}) sin filtros retorna todos los documentos de la colección
        const bebederos = await Bebedero.find({}).lean();
        return bebederos;
    } catch (error) {
        // Relanzamos el error para que lo maneje el controlador
        throw new Error(`Error al obtener bebederos: ${error.message}`);
    }
};

/**
 * Crea un nuevo bebedero en la base de datos
 * 
 * Explicación:
 * - new Bebedero(data): Crea una nueva instancia del modelo con los datos proporcionados
 * - .save(): Guarda el documento en la base de datos
 * - Retorna el documento creado con su _id asignado por MongoDB
 * 
 * @param {Object} data - Datos del bebedero a crear (ya validados por Joi)
 * @param {string} data.nombre - Nombre del bebedero
 * @param {string} data.ubicacion - Ubicación del bebedero
 * @param {string} data.estado - Estado del bebedero
 * @param {number} data.caudal - Caudal en litros/minuto
 * @param {Date} [data.fechaRegistro] - Fecha de registro (opcional, por defecto actual)
 * @returns {Promise<Object>} - El bebedero creado con su _id
 */
const createBebedero = async (data) => {
    try {
        // Creamos una nueva instancia del modelo con los datos recibidos
        const nuevoBebedero = new Bebedero(data);
        
        // Guardamos en la base de datos y retornamos el documento creado
        const bebederoGuardado = await nuevoBebedero.save();
        
        return bebederoGuardado;
    } catch (error) {
        throw new Error(`Error al crear bebedero: ${error.message}`);
    }
};

/**
 * Actualiza el estado de un bebedero específico por su ID
 * 
 * Explicación:
 * - findByIdAndUpdate(id, update, options): Busca por _id y actualiza en una operación
 * - $set: { estado }: Operador de MongoDB que establece el nuevo valor del campo
 * - { new: true }: Opción que hace que retorne el documento actualizado
 *                  (por defecto retorna el documento antes de la actualización)
 * - runValidators: true: Ejecuta las validaciones de Mongoose en la actualización
 * 
 * @param {string} id - ID del bebedero a actualizar (ObjectId de MongoDB)
 * @param {string} nuevoEstado - Nuevo estado a asignar
 * @returns {Promise<Object|null>} - El bebedero actualizado o null si no existe
 */
const updateEstado = async (id, nuevoEstado) => {
    try {
        // findByIdAndUpdate: método que busca por _id y actualiza atómicamente
        const bebederoActualizado = await Bebedero.findByIdAndUpdate(
            id, // ID del documento a buscar
            { $set: { estado: nuevoEstado } }, // Campos a actualizar
            { 
                new: true, // Retorna el documento DESPUÉS de la actualización
                runValidators: true // Ejecuta validaciones de Mongoose
            }
        );
        
        // Si no se encontró el bebedero, retornamos null
        if (!bebederoActualizado) {
            return null;
        }
        
        return bebederoActualizado;
    } catch (error) {
        throw new Error(`Error al actualizar estado: ${error.message}`);
    }
};

// Exportamos las funciones para usarlas en los controladores
module.exports = {
    getAllBebederos,
    createBebedero,
    updateEstado
};
