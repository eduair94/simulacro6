/**
 * Configuración del Store de Redux
 * 
 * Este archivo configura el store central de Redux usando Redux Toolkit.
 * 
 * El store es el contenedor del estado global de la aplicación.
 * Todos los componentes pueden acceder al estado y disparar acciones.
 * 
 * configureStore de Redux Toolkit:
 * - Configura automáticamente Redux DevTools
 * - Incluye middleware de serialización por defecto
 * - Simplifica la configuración comparado con createStore clásico
 */

import { configureStore } from '@reduxjs/toolkit';
import bebederoReducer from './bebederoSlice';

/**
 * Creación del store
 * 
 * El objeto reducer mapea cada slice a una parte del estado:
 * - bebederos: estado manejado por bebederoReducer
 * 
 * El estado resultante tendrá la forma:
 * {
 *   bebederos: {
 *     items: [...]
 *   }
 * }
 */
const store = configureStore({
    reducer: {
        // El reducer de bebederos maneja state.bebederos
        bebederos: bebederoReducer
    }
});

export default store;
