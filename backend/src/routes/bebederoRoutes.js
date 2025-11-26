/**
 * ========================================
 * PUNTO 4: ROUTES (Parte 2 de 2) - (11 pts.)
 * ========================================
 * 
 * Este archivo define las rutas de Express para la entidad Bebederos.
 * 
 * Las rutas conectan las URLs con los controladores correspondientes:
 * - GET /bebederos → lista todos los bebederos
 * - POST /bebederos → crea un bebedero (validando con Joi)
 * - PATCH /bebederos/:id/estado → actualiza el estado de un bebedero
 * 
 * Express Router:
 * - Router() crea un mini-aplicación de rutas modular
 * - Se puede montar en la aplicación principal con un prefijo
 */

const express = require('express');

// Creamos un router de Express
// Router() permite agrupar rutas relacionadas en un módulo separado
const router = express.Router();

// Importamos los controladores
const bebederoController = require('../controllers/bebederoController');

/**
 * GET /bebederos
 * 
 * Lista todos los bebederos de la base de datos.
 * 
 * Respuesta exitosa (200):
 * {
 *   success: true,
 *   data: [...bebederos],
 *   count: número
 * }
 */
router.get('/', bebederoController.getBebederos);

/**
 * POST /bebederos
 * 
 * Crea un nuevo bebedero.
 * El body debe contener los campos validados por Joi:
 * - nombre (string, 3-50 chars)
 * - ubicacion (string, 10-100 chars)
 * - estado (operativo|mantenimiento|fuera de servicio)
 * - caudal (number, 0.5-50)
 * - fechaRegistro (opcional, default: ahora)
 * 
 * Respuesta exitosa (201):
 * {
 *   success: true,
 *   message: "Bebedero creado exitosamente",
 *   data: {...bebedero creado}
 * }
 */
router.post('/', bebederoController.postBebedero);

/**
 * PATCH /bebederos/:id/estado
 * 
 * Actualiza el estado de un bebedero específico.
 * - :id → ID del bebedero (ObjectId de MongoDB)
 * - Body debe contener: { estado: "operativo" | "mantenimiento" | "fuera de servicio" }
 * 
 * Respuesta exitosa (200):
 * {
 *   success: true,
 *   message: "Estado actualizado exitosamente",
 *   data: {...bebedero actualizado}
 * }
 */
router.patch('/:id/estado', bebederoController.patchEstado);

// Exportamos el router para usarlo en la aplicación principal
module.exports = router;
