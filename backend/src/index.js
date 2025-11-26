/**
 * ========================================
 * ARCHIVO PRINCIPAL DEL SERVIDOR (Backend)
 * ========================================
 * 
 * Este es el punto de entrada de la aplicación Express.
 * 
 * Responsabilidades:
 * 1. Cargar variables de entorno
 * 2. Conectar a la base de datos
 * 3. Configurar middlewares (CORS, JSON parser)
 * 4. Montar las rutas
 * 5. Iniciar el servidor
 */

// Cargamos las variables de entorno del archivo .env
// Esto debe hacerse ANTES de usar process.env
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const bebederoRoutes = require('./routes/bebederoRoutes');

// Creamos la aplicación Express
const app = express();

// Puerto del servidor (de .env o 3001 por defecto)
const PORT = process.env.PORT || 3001;

// ========================================
// MIDDLEWARES
// ========================================

/**
 * CORS (Cross-Origin Resource Sharing)
 * Permite que el frontend (en otro puerto) haga peticiones al backend.
 * Sin esto, el navegador bloquearía las peticiones.
 */
app.use(cors());

/**
 * express.json()
 * Parsea el body de las peticiones con Content-Type: application/json
 * Convierte el JSON del body a un objeto JavaScript accesible en req.body
 */
app.use(express.json());

// ========================================
// RUTAS
// ========================================

/**
 * Montamos las rutas de bebederos bajo el prefijo /bebederos
 * Esto significa que:
 * - GET /bebederos → bebederoRoutes GET /
 * - POST /bebederos → bebederoRoutes POST /
 * - PATCH /bebederos/:id/estado → bebederoRoutes PATCH /:id/estado
 */
app.use('/bebederos', bebederoRoutes);

/**
 * Ruta raíz para verificar que el servidor está funcionando
 */
app.get('/', (req, res) => {
    res.json({
        message: 'API de Bebederos - Simulacro 6',
        version: '1.0.0',
        endpoints: {
            bebederos: '/bebederos',
            health: '/health'
        }
    });
});

/**
 * Ruta de health check
 * Útil para verificar que el servidor y la BD están funcionando
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// ========================================
// INICIALIZACIÓN
// ========================================

/**
 * Función para inicializar el servidor
 * 1. Conecta a MongoDB
 * 2. Inicia el servidor Express
 */
const startServer = async () => {
    try {
        // Conectamos a la base de datos
        await connectDB();
        
        // Iniciamos el servidor
        app.listen(PORT, () => {
            console.log(`��� Servidor corriendo en http://localhost:${PORT}`);
            console.log(`��� API disponible en http://localhost:${PORT}/bebederos`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

// Iniciamos el servidor
startServer();
