/**
 * Punto de entrada de la aplicación React
 * 
 * Este archivo:
 * 1. Importa React y ReactDOM
 * 2. Configura el Provider de Redux
 * 3. Renderiza la aplicación en el DOM
 * 
 * El Provider de Redux hace que el store esté disponible
 * para todos los componentes de la aplicación.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App.jsx';
import './index.css';

/**
 * Renderizamos la aplicación
 * 
 * Estructura:
 * - StrictMode: Activa verificaciones adicionales en desarrollo
 * - Provider: Provee el store de Redux a toda la aplicación
 *   - store={store}: El store configurado en ./store/index.js
 * - App: Componente raíz de la aplicación
 */
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Provider hace que el store de Redux esté disponible 
            para todos los componentes hijos */}
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
