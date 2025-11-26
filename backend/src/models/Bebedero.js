/**
 * ========================================
 * PUNTO 2: MODELO DE MONGOOSE (5 pts.)
 * ========================================
 * 
 * Este archivo define el modelo de Mongoose para la entidad Bebedero.
 * 
 * Estructura del modelo:
 * - nombre: String - Nombre identificador del bebedero
 * - ubicacion: String - Dirección o descripción de ubicación
 * - estado: String - Estado actual (operativo, mantenimiento, fuera de servicio)
 * - caudal: Number - Litros por minuto que dispensa
 * - fechaRegistro: Date - Fecha de registro en el sistema
 * 
 * NOTA: No se incluyen validaciones en Mongoose ya que se asume que
 * los datos ya fueron validados con Joi antes de llegar al modelo.
 * 
 * Nombre de colección: bebederos
 */

const mongoose = require('mongoose');

/**
 * Definición del esquema de Mongoose para Bebedero
 * 
 * Explicación:
 * - mongoose.Schema(): Crea un nuevo esquema que define la estructura del documento
 * - El segundo parámetro son las opciones del esquema:
 *   - collection: nombre exacto de la colección en MongoDB
 *   - timestamps: si fuera true, agregaría createdAt y updatedAt automáticamente
 */
const bebederoSchema = new mongoose.Schema({
    // Nombre del bebedero
    nombre: {
        type: String
    },
    
    // Ubicación física del bebedero
    ubicacion: {
        type: String
    },
    
    // Estado actual del bebedero
    // Posibles valores: "operativo", "mantenimiento", "fuera de servicio"
    estado: {
        type: String
    },
    
    // Caudal en litros por minuto
    caudal: {
        type: Number
    },
    
    // Fecha de registro del bebedero en el sistema
    fechaRegistro: {
        type: Date,
        default: Date.now // Valor por defecto: fecha actual
    }
}, {
    // Opciones del esquema
    collection: 'bebederos', // Nombre de la colección en MongoDB
    versionKey: false // Desactiva el campo __v que Mongoose agrega por defecto
});

/**
 * Creación del modelo a partir del esquema
 * 
 * mongoose.model() toma dos parámetros:
 * 1. Nombre del modelo (singular, con mayúscula inicial)
 * 2. Esquema que define la estructura
 * 
 * MongoDB guardará los documentos en la colección especificada ('bebederos')
 */
const Bebedero = mongoose.model('Bebedero', bebederoSchema);

// Exportamos el modelo para usarlo en otras partes de la aplicación
module.exports = Bebedero;
