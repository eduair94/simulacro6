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
     * 
     * useState(false) inicializa el estado en false
     * El toggle cambiará entre true y false con cada clic
     */
    const [filtroOperativos, setFiltroOperativos] = useState(false);
    
    /**
     * Accedemos a los bebederos del store de Redux
     * 
     * useSelector recibe una función que extrae la parte del estado
     * que necesitamos. En este caso: state.bebederos.items
     */
    const bebederosStore = useSelector(state => state.bebederos.items);
    
    /**
     * Calculamos la lista filtrada de bebederos
     * 
     * Si filtroOperativos es true:
     *   - Filtramos solo los que tienen estado === 'operativo'
     *   - .filter() crea un nuevo array con los elementos que pasan el test
     * 
     * Si filtroOperativos es false:
     *   - Mostramos todos los bebederos
     */
    const bebederosFiltrados = filtroOperativos
        ? bebederosStore.filter(bebedero => bebedero.estado === 'operativo')
        : bebederosStore;
    
    /**
     * Función para manejar el clic en el botón de filtro
     * 
     * Comportamiento toggle:
     * - 1er clic (impar): filtroOperativos pasa de false a true (filtra operativos)
     * - 2do clic (par): filtroOperativos pasa de true a false (muestra todos)
     * - 3er clic (impar): filtroOperativos pasa de false a true (filtra operativos)
     * - ... y así sucesivamente
     * 
     * setFiltroOperativos(!filtroOperativos) invierte el valor booleano actual
     */
    const handleToggleFiltro = () => {
        // Invertimos el estado actual del filtro
        // Si es true, pasa a false. Si es false, pasa a true.
        setFiltroOperativos(!filtroOperativos);
    };
    
    /**
     * Contamos cuántos bebederos están operativos
     * Útil para mostrar información en el botón
     */
    const cantidadOperativos = bebederosStore.filter(b => b.estado === 'operativo').length;
    
    /**
     * Renderizado del componente
     * 
     * Estructura:
     * - Título
     * - Botón de filtro (tipo toggle)
     * - Contador de resultados
     * - Componente ListaBebederos con los bebederos filtrados
     */
    return (
        <div className="bebederos-container">
            {/* Sección de controles */}
            <div 
                className="controles"
                style={{
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px'
                }}
            >
                {/**
                 * Botón de filtro (BotonFiltrarOperativos)
                 * 
                 * - onClick: ejecuta handleToggleFiltro al hacer clic
                 * - El texto y estilo cambian según el estado del filtro
                 * - Funciona como toggle: clic par/impar
                 */}
                <button
                    onClick={handleToggleFiltro}
                    style={{
                        padding: '12px 24px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: filtroOperativos ? '#4CAF50' : '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        transition: 'background-color 0.3s'
                    }}
                >
                    {/* El texto cambia según el estado del filtro */}
                    {filtroOperativos 
                        ? '✓ Mostrando solo operativos - Clic para ver todos'
                        : '��� Filtrar solo operativos'
                    }
                </button>
                
                {/* Contador de bebederos */}
                <span style={{ color: '#666' }}>
                    Mostrando: {bebederosFiltrados.length} de {bebederosStore.length} 
                    {' '}({cantidadOperativos} operativos)
                </span>
            </div>
            
            {/**
             * Componente ListaBebederos
             * 
             * Le pasamos bebederosFiltrados como prop:
             * - Si el filtro está activo: solo los operativos
             * - Si no: todos los bebederos
             * 
             * El componente ListaBebederos mostrará la lista que le pasemos
             */}
            <ListaBebederos bebederos={bebederosFiltrados} />
        </div>
    );
};

export default BebederosContainer;
