/**
 * ========================================
 * PUNTO 5: REDUX SLICE (8 pts.)
 * ========================================
 * 
 * Este archivo implementa el slice de Redux Toolkit para la entidad bebederos.
 * 
 * Redux Toolkit simplifica la configuración de Redux:
 * - createSlice: Crea automáticamente action creators y reducers
 * - Permite escribir código "mutante" que internamente usa Immer
 * 
 * Estado inicial:
 * - items: Array vacío que contendrá los bebederos
 * 
 * Acciones implementadas:
 * - setItems: Guarda la lista completa de bebederos
 * - addItem: Agrega un nuevo bebedero al array
 * - updateEstado: Actualiza el estado de un bebedero específico por ID
 */

import { createSlice } from '@reduxjs/toolkit';

/**
 * Estado inicial del slice de bebederos
 * 
 * Estructura:
 * {
 *   items: [] // Array de bebederos
 * }
 * 
 * Cada bebedero tiene la estructura:
 * {
 *   _id: string,          // ID de MongoDB
 *   nombre: string,       // Nombre del bebedero
 *   ubicacion: string,    // Ubicación física
 *   estado: string,       // operativo | mantenimiento | fuera de servicio
 *   caudal: number,       // Litros por minuto
 *   fechaRegistro: string // Fecha ISO
 * }
 */
const initialState = {
    items: []
};

/**
 * Creación del slice de bebederos
 * 
 * createSlice genera automáticamente:
 * - Action creators (funciones que crean acciones)
 * - Reducers (funciones que manejan las acciones)
 * 
 * Parámetros:
 * - name: Nombre del slice (prefijo para las acciones)
 * - initialState: Estado inicial
 * - reducers: Objeto con las funciones reductoras
 */
const bebederoSlice = createSlice({
    // Nombre del slice - las acciones serán "bebederos/setItems", etc.
    name: 'bebederos',
    
    // Estado inicial
    initialState,
    
    // Reducers: funciones que modifican el estado
    reducers: {
        /**
         * setItems - Guarda la lista completa de bebederos
         * 
         * Esta acción se usa cuando:
         * - Se carga la lista inicial desde la API
         * - Se necesita reemplazar toda la lista
         * 
         * @param {Object} state - Estado actual (manejado por Immer)
         * @param {Object} action - Acción con payload (los bebederos)
         * 
         * Ejemplo de uso:
         * dispatch(setItems([{ _id: '1', nombre: 'Bebedero 1', ... }]))
         */
        setItems: (state, action) => {
            // Reemplazamos todo el array de items con el payload
            // Gracias a Immer, podemos "mutar" el estado directamente
            state.items = action.payload;
        },

        /**
         * addItem - Agrega un nuevo bebedero al array
         * 
         * Esta acción se usa cuando:
         * - Se crea un nuevo bebedero exitosamente en la API
         * - Se necesita agregar el bebedero al estado local
         * 
         * @param {Object} state - Estado actual
         * @param {Object} action - Acción con payload (el nuevo bebedero)
         * 
         * Ejemplo de uso:
         * dispatch(addItem({ _id: '2', nombre: 'Nuevo Bebedero', ... }))
         */
        addItem: (state, action) => {
            // Agregamos el nuevo bebedero al final del array
            state.items.push(action.payload);
        },

        /**
         * updateEstado - Actualiza el estado de un bebedero específico
         * 
         * Esta acción se usa cuando:
         * - Se actualiza el estado de un bebedero en la API
         * - Se necesita reflejar el cambio en el estado local
         * 
         * @param {Object} state - Estado actual
         * @param {Object} action - Acción con payload { id, estado }
         *   - id: ID del bebedero a actualizar
         *   - estado: Nuevo estado a asignar
         * 
         * Ejemplo de uso:
         * dispatch(updateEstado({ id: '123', estado: 'mantenimiento' }))
         * 
         * Nota: La letra dice "eliminar un bebedero por id" pero por el nombre
         * de la acción (updateEstado) se entiende que debe actualizar el estado.
         */
        updateEstado: (state, action) => {
            // Extraemos id y estado del payload
            const { id, estado } = action.payload;
            
            // Buscamos el índice del bebedero con ese ID
            const index = state.items.findIndex(item => item._id === id);
            
            // Si encontramos el bebedero, actualizamos su estado
            if (index !== -1) {
                state.items[index].estado = estado;
            }
        }
    }
});

// Exportamos las acciones generadas automáticamente
// Estas se usarán con dispatch() en los componentes
export const { setItems, addItem, updateEstado } = bebederoSlice.actions;

// Exportamos el reducer para configurar el store
// Este se usará en store/index.js
export default bebederoSlice.reducer;
