/**
 * ========================================
 * PUNTO 1: VALIDADOR CON JOI (5 pts.)
 * ========================================
 * 
 * Este archivo implementa el esquema de validación con Joi para el modelo Bebederos.
 * 
 * Propiedades validadas:
 * - nombre: string, requerido, mínimo 3 y máximo 50 caracteres
 * - ubicacion: string, requerido, mínimo 10 y máximo 100 caracteres
 * - estado: string, requerido, valores: "operativo", "mantenimiento", "fuera de servicio"
 * - caudal: número, requerido, litros por minuto, mínimo 0.5, máximo 50
 * - fechaRegistro: fecha, con fecha por defecto la actual
 */

const Joi = require('joi');

// Valores válidos para el estado del bebedero
const ESTADOS_VALIDOS = ['operativo', 'mantenimiento', 'fuera de servicio'];

/**
 * Esquema de validación principal para crear/actualizar un Bebedero completo
 * 
 * Explicación de cada campo:
 * - Joi.string(): Valida que sea una cadena de texto
 * - .min() y .max(): Establecen longitud mínima y máxima
 * - .required(): Hace el campo obligatorio
 * - .valid(...valores): Restringe a valores específicos
 * - Joi.number(): Valida que sea un número
 * - Joi.date(): Valida que sea una fecha
 * - .default(): Establece valor por defecto si no se proporciona
 */
const bebederoSchema = Joi.object({
    // nombre: string, requerido, entre 3 y 50 caracteres
    nombre: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.min': 'El nombre debe tener al menos 3 caracteres',
            'string.max': 'El nombre no puede tener más de 50 caracteres',
            'any.required': 'El nombre es requerido',
            'string.empty': 'El nombre no puede estar vacío'
        }),

    // ubicacion: string, requerido, entre 10 y 100 caracteres
    ubicacion: Joi.string()
        .min(10)
        .max(100)
        .required()
        .messages({
            'string.min': 'La ubicación debe tener al menos 10 caracteres',
            'string.max': 'La ubicación no puede tener más de 100 caracteres',
            'any.required': 'La ubicación es requerida',
            'string.empty': 'La ubicación no puede estar vacía'
        }),

    // estado: string, requerido, solo valores específicos permitidos
    estado: Joi.string()
        .valid(...ESTADOS_VALIDOS)
        .required()
        .messages({
            'any.only': 'El estado debe ser: operativo, mantenimiento o fuera de servicio',
            'any.required': 'El estado es requerido',
            'string.empty': 'El estado no puede estar vacío'
        }),

    // caudal: número, requerido, entre 0.5 y 50 litros por minuto
    caudal: Joi.number()
        .min(0.5)
        .max(50)
        .required()
        .messages({
            'number.min': 'El caudal mínimo es 0.5 litros por minuto',
            'number.max': 'El caudal máximo es 50 litros por minuto',
            'any.required': 'El caudal es requerido',
            'number.base': 'El caudal debe ser un número'
        }),

    // fechaRegistro: fecha, con valor por defecto la fecha actual
    fechaRegistro: Joi.date()
        .default(() => new Date())
        .messages({
            'date.base': 'La fecha de registro debe ser una fecha válida'
        })
});

/**
 * Validador solo para el campo estado
 * Útil para el endpoint PATCH /bebederos/:id/estado (Punto 4)
 * 
 * Solo valida que el estado esté entre los valores permitidos
 */
const estadoSchema = Joi.object({
    estado: Joi.string()
        .valid(...ESTADOS_VALIDOS)
        .required()
        .messages({
            'any.only': 'El estado debe ser: operativo, mantenimiento o fuera de servicio',
            'any.required': 'El estado es requerido',
            'string.empty': 'El estado no puede estar vacío'
        })
});

/**
 * Función para validar un bebedero completo
 * @param {Object} data - Datos del bebedero a validar
 * @returns {Object} - Resultado de la validación con value y error
 */
const validateBebedero = (data) => {
    return bebederoSchema.validate(data, { 
        abortEarly: false // Retorna todos los errores, no solo el primero
    });
};

/**
 * Función para validar solo el estado
 * @param {Object} data - Objeto con el campo estado a validar
 * @returns {Object} - Resultado de la validación
 */
const validateEstado = (data) => {
    return estadoSchema.validate(data, {
        abortEarly: false
    });
};

// Exportamos los esquemas y funciones de validación
module.exports = {
    bebederoSchema,
    estadoSchema,
    validateBebedero,
    validateEstado,
    ESTADOS_VALIDOS
};
