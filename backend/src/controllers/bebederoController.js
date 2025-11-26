/**
 * ========================================
 * PUNTO 4: CONTROLLERS (Parte 1 de 2) - (11 pts.)
 * ========================================
 * 
 * Este archivo implementa los controladores para manejar las peticiones HTTP
 * relacionadas con los bebederos.
 * 
 * Los controladores son funciones que:
 * 1. Reciben la petición (req) y respuesta (res)
 * 2. Procesan la petición (validación, llamada a servicios)
 * 3. Envían la respuesta apropiada
 * 
 * Endpoints implementados:
 * - GET /bebederos → getBebederos
 * - POST /bebederos → postBebedero
 * - PATCH /bebederos/:id/estado → patchEstado
 */

// Importamos el servicio de bebederos para acceso a BD
const bebederoService = require('../services/bebederoService');

// Importamos los validadores de Joi
const { validateBebedero, validateEstado, ESTADOS_VALIDOS } = require('../validators/bebederoValidator');

/**
 * GET /bebederos - Obtiene todos los bebederos
 * 
 * Explicación:
 * - Es una función async porque llamamos a la base de datos
 * - Usa try/catch para manejo de errores
 * - res.json() envía la respuesta en formato JSON
 * - res.status(500) indica error interno del servidor
 * 
 * @param {Object} req - Objeto de petición de Express
 * @param {Object} res - Objeto de respuesta de Express
 */
const getBebederos = async (req, res) => {
    try {
        // Llamamos al servicio para obtener todos los bebederos
        const bebederos = await bebederoService.getAllBebederos();
        
        // Respondemos con código 200 (OK) y los datos
        res.status(200).json({
            success: true,
            data: bebederos,
            count: bebederos.length
        });
    } catch (error) {
        // En caso de error, respondemos con código 500
        res.status(500).json({
            success: false,
            message: 'Error al obtener bebederos',
            error: error.message
        });
    }
};

/**
 * POST /bebederos - Crea un nuevo bebedero
 * 
 * Explicación:
 * - Primero validamos los datos con Joi antes de guardar
 * - Si la validación falla, retornamos error 400 (Bad Request)
 * - Si pasa la validación, creamos el bebedero
 * - res.status(201) indica que se creó un recurso exitosamente
 * 
 * Flujo:
 * 1. Recibir datos del body de la petición
 * 2. Validar con Joi
 * 3. Si hay error, retornar 400 con detalles
 * 4. Si es válido, guardar en BD
 * 5. Retornar 201 con el bebedero creado
 * 
 * @param {Object} req - Objeto de petición (req.body contiene los datos)
 * @param {Object} res - Objeto de respuesta
 */
const postBebedero = async (req, res) => {
    try {
        // Paso 1: Extraemos los datos del cuerpo de la petición
        const datosBebedero = req.body;
        
        // Paso 2: Validamos con Joi
        // validateBebedero retorna { error, value }
        // - error: contiene los errores de validación (si los hay)
        // - value: contiene los datos validados (con defaults aplicados)
        const { error, value } = validateBebedero(datosBebedero);
        
        // Paso 3: Si hay error de validación, retornamos 400
        if (error) {
            // Extraemos los mensajes de error para una respuesta más clara
            const errores = error.details.map(detail => detail.message);
            
            return res.status(400).json({
                success: false,
                message: 'Error de validación',
                errors: errores
            });
        }
        
        // Paso 4: Los datos son válidos, creamos el bebedero
        // Usamos 'value' que contiene los datos validados con defaults
        const nuevoBebedero = await bebederoService.createBebedero(value);
        
        // Paso 5: Respondemos con código 201 (Created)
        res.status(201).json({
            success: true,
            message: 'Bebedero creado exitosamente',
            data: nuevoBebedero
        });
    } catch (error) {
        // Error interno del servidor
        res.status(500).json({
            success: false,
            message: 'Error al crear bebedero',
            error: error.message
        });
    }
};

/**
 * PATCH /bebederos/:id/estado - Actualiza el estado de un bebedero
 * 
 * Explicación:
 * - PATCH se usa para actualizaciones parciales (solo un campo)
 * - :id es un parámetro de ruta, accesible en req.params.id
 * - El nuevo estado viene en req.body.estado
 * - Validamos que el estado sea uno de los permitidos
 * 
 * Nota del ejercicio: Aunque dice "elimina un bebedero por id" en la letra,
 * por el contexto (PATCH y updateEstado) se entiende que debe actualizar el estado.
 * 
 * @param {Object} req - Petición con req.params.id y req.body.estado
 * @param {Object} res - Objeto de respuesta
 */
const patchEstado = async (req, res) => {
    try {
        // Extraemos el ID de los parámetros de la URL
        const { id } = req.params;
        
        // Extraemos el nuevo estado del body
        const { estado } = req.body;
        
        // Validación: verificamos que se proporcione el estado
        if (!estado) {
            return res.status(400).json({
                success: false,
                message: 'El estado es requerido en el body'
            });
        }
        
        // Opción 1: Validación usando el validador Joi
        const { error } = validateEstado({ estado });
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Estado inválido',
                errors: error.details.map(d => d.message),
                estadosValidos: ESTADOS_VALIDOS
            });
        }
        
        /* 
        // Opción 2: Validación manual (alternativa)
        if (!ESTADOS_VALIDOS.includes(estado)) {
            return res.status(400).json({
                success: false,
                message: 'Estado inválido',
                estadosValidos: ESTADOS_VALIDOS
            });
        }
        */
        
        // Llamamos al servicio para actualizar el estado
        const bebederoActualizado = await bebederoService.updateEstado(id, estado);
        
        // Si no se encontró el bebedero
        if (!bebederoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'Bebedero no encontrado'
            });
        }
        
        // Respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'Estado actualizado exitosamente',
            data: bebederoActualizado
        });
    } catch (error) {
        // Verificamos si es un error de ID inválido de MongoDB
        if (error.message.includes('Cast to ObjectId failed')) {
            return res.status(400).json({
                success: false,
                message: 'ID de bebedero inválido'
            });
        }
        
        res.status(500).json({
            success: false,
            message: 'Error al actualizar estado',
            error: error.message
        });
    }
};

// Exportamos los controladores
module.exports = {
    getBebederos,
    postBebedero,
    patchEstado
};
