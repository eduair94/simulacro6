/**
 * ========================================
 * PUNTO 6: COMPONENTE ListaBebederos (9 pts.)
 * ========================================
 * 
 * Este componente muestra una lista de bebederos.
 * 
 * Funcionalidades:
 * - useEffect para hacer petición GET a /bebederos al montar
 * - Dispara la acción setItems cuando recibe los datos
 * - Renderiza los bebederos mostrando: Nombre, Ubicación, Estado, Caudal
 * - Recibe por parámetro una lista de bebederos (opcional):
 *   - Si está definida: muestra esos datos
 *   - Si no está definida: muestra los datos del store
 * 
 * Hooks utilizados:
 * - useEffect: Para ejecutar efectos secundarios (petición HTTP)
 * - useSelector: Para acceder al estado de Redux
 * - useDispatch: Para disparar acciones de Redux
 */

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setItems } from '../store/bebederoSlice';

// URL base de la API
// En desarrollo: http://localhost:3001
// En producción: se configura mediante variable de entorno VITE_API_URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Componente ListaBebederos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} [props.bebederos] - Lista opcional de bebederos
 *   - Si se proporciona, se muestran estos bebederos
 *   - Si no se proporciona, se muestran los del store
 */
const ListaBebederos = ({ bebederos: bebederosProp }) => {
    // useDispatch: Hook para obtener la función dispatch
    // dispatch se usa para enviar acciones al store de Redux
    const dispatch = useDispatch();
    
    // useSelector: Hook para acceder al estado de Redux
    // Accedemos a state.bebederos.items (definido en el store)
    const bebederosStore = useSelector(state => state.bebederos.items);
    
    /**
     * Determinamos qué lista de bebederos mostrar:
     * - Si se pasó bebederosProp como parámetro, usamos esos
     * - Si no, usamos los del store
     * 
     * Esto permite usar el componente de dos formas:
     * 1. <ListaBebederos /> - Usa datos del store
     * 2. <ListaBebederos bebederos={miLista} /> - Usa lista pasada como prop
     */
    const bebederosAMostrar = bebederosProp !== undefined ? bebederosProp : bebederosStore;
    
    /**
     * useEffect para cargar los bebederos al montar el componente
     * 
     * Explicación:
     * - Se ejecuta una vez al montar (array de dependencias vacío)
     * - Hace petición GET a /bebederos
     * - Si es exitosa, dispara setItems con los datos
     * - Si hay error, lo muestra en consola
     */
    useEffect(() => {
        /**
         * Función async para obtener bebederos de la API
         * 
         * Se define dentro del useEffect porque:
         * - useEffect no puede ser async directamente
         * - Necesitamos usar await para la petición
         */
        const fetchBebederos = async () => {
            try {
                // Hacemos petición GET a la API
                // axios.get() retorna un objeto con data, status, etc.
                const response = await axios.get(`${API_URL}/bebederos`);
                
                // La respuesta tiene la estructura { success, data, count }
                // Extraemos el array de bebederos de response.data.data
                const bebederos = response.data.data;
                
                // Disparamos la acción setItems para guardar en el store
                // Esto actualiza el estado global de Redux
                dispatch(setItems(bebederos));
            } catch (error) {
                // Manejo de errores - mostramos en consola
                console.error('Error al cargar bebederos:', error);
            }
        };
        
        // Llamamos a la función
        fetchBebederos();
    }, [dispatch]); // dispatch en dependencias (buena práctica)
    
    /**
     * Función helper para obtener el color del badge según el estado
     * 
     * @param {string} estado - Estado del bebedero
     * @returns {Object} - Objeto con estilos CSS
     */
    const getEstadoStyle = (estado) => {
        switch (estado) {
            case 'operativo':
                return { backgroundColor: '#4CAF50', color: 'white' };
            case 'mantenimiento':
                return { backgroundColor: '#FF9800', color: 'white' };
            case 'fuera de servicio':
                return { backgroundColor: '#f44336', color: 'white' };
            default:
                return { backgroundColor: '#9E9E9E', color: 'white' };
        }
    };
    
    /**
     * Renderizado del componente
     * 
     * Estructura:
     * - Título de la sección
     * - Lista de bebederos (cada uno en un div/article)
     *   - Nombre
     *   - Ubicación
     *   - Estado (con badge de color)
     *   - Caudal
     */
    return (
        <div className="lista-bebederos">
            <h2>Lista de Bebederos</h2>
            
            {/* Mostramos mensaje si no hay bebederos */}
            {bebederosAMostrar.length === 0 ? (
                <p>No hay bebederos para mostrar</p>
            ) : (
                /* Mapeamos el array de bebederos a elementos JSX */
                bebederosAMostrar.map(bebedero => (
                    <article 
                        key={bebedero._id} 
                        className="bebedero-card"
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '16px',
                            marginBottom: '12px',
                            backgroundColor: '#fff'
                        }}
                    >
                        {/* Nombre del bebedero */}
                        <h3 style={{ margin: '0 0 8px 0', color: '#333' }}>
                            {bebedero.nombre}
                        </h3>
                        
                        {/* Ubicación */}
                        <p style={{ margin: '4px 0', color: '#666' }}>
                            <strong>��� Ubicación:</strong> {bebedero.ubicacion}
                        </p>
                        
                        {/* Estado con badge de color */}
                        <p style={{ margin: '4px 0' }}>
                            <strong>Estado:</strong>{' '}
                            <span 
                                style={{
                                    ...getEstadoStyle(bebedero.estado),
                                    padding: '4px 8px',
                                    borderRadius: '4px',
                                    fontSize: '0.9em'
                                }}
                            >
                                {bebedero.estado}
                            </span>
                        </p>
                        
                        {/* Caudal */}
                        <p style={{ margin: '4px 0', color: '#666' }}>
                            <strong>��� Caudal:</strong> {bebedero.caudal} L/min
                        </p>
                    </article>
                ))
            )}
        </div>
    );
};

export default ListaBebederos;
