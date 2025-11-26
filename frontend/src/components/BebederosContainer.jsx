/**
 * ========================================
 * PUNTO 7: BotonFiltrarOperativos (6 pts.)
 * ========================================
 * 
 * Este componente contiene al componente ListaBebederos y agrega
 * un botón para filtrar solo los bebederos operativos.
 * 
 * Funcionalidades:
 * - Contiene al componente ListaBebederos
 * - Tiene un state local para controlar el filtro
 * - Al hacer clic en el botón:
 *   - Filtra solo bebederos con estado "operativo"
 *   - El filtro es frontend (sin llamada a API)
 * - Funciona como toggle:
 *   - Número par de clics: muestra todos
 *   - Número impar de clics: muestra solo operativos
 * 
 * Hooks utilizados:
 * - useState: Para el estado del filtro (toggle)
 * - useSelector: Para acceder a los bebederos del store
 */

import { useState } from 'react';
import { useSelector } from 'react-redux';
import ListaBebederos from './ListaBebederos';

/**
 * Componente BebederosContainer
 * 
 * Actúa como contenedor/wrapper de ListaBebederos
 * y agrega la funcionalidad de filtrado por estado operativo
 */
const BebederosContainer = () => {
    /**
     * Estado local para controlar si el filtro está activo
     * 
     * - false (estado inicial): muestra todos los bebederos
     * - true: muestra solo bebederos operativos
     */
    const [filtroOperativos, setFiltroOperativos] = useState(false);
    
    /**
     * Accedemos a los bebederos del store de Redux
     */
    const bebederosStore = useSelector(state => state.bebederos.items);
    
    /**
     * Calculamos la lista filtrada de bebederos
     */
    const bebederosFiltrados = filtroOperativos
        ? bebederosStore.filter(bebedero => bebedero.estado === 'operativo')
        : bebederosStore;
    
    /**
     * Función para manejar el clic en el botón de filtro (toggle)
     */
    const handleToggleFiltro = () => {
        setFiltroOperativos(!filtroOperativos);
    };
    
    /**
     * Contamos cuántos bebederos están operativos
     */
    const cantidadOperativos = bebederosStore.filter(b => b.estado === 'operativo').length;
    
    return (
        <div className="bebederos-container">
            {/* Sección de controles */}
            <div className="controls">
                {/**
                 * Botón de filtro (BotonFiltrarOperativos)
                 */}
                <button
                    onClick={handleToggleFiltro}
                    className={`btn ${filtroOperativos ? 'btn--success' : 'btn--primary'}`}
                    aria-pressed={filtroOperativos}
                >
                    {filtroOperativos 
                        ? 'Mostrando solo operativos - Clic para ver todos'
                        : 'Filtrar solo operativos'
                    }
                </button>
                
                {/* Contador de bebederos */}
                <span className="controls__count">
                    Mostrando: {bebederosFiltrados.length} de {bebederosStore.length} 
                    {' '}({cantidadOperativos} operativos)
                </span>
            </div>
            
            {/**
             * Componente ListaBebederos
             * Le pasamos bebederosFiltrados como prop
             */}
            <ListaBebederos bebederos={bebederosFiltrados} />
        </div>
    );
};

export default BebederosContainer;
