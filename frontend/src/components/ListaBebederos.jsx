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
 * - Recibe por parámetro una lista de bebederos (opcional)
 * 
 * Hooks utilizados:
 * - useEffect: Para ejecutar efectos secundarios (petición HTTP)
 * - useSelector: Para acceder al estado de Redux
 * - useDispatch: Para disparar acciones de Redux
 */

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../store/bebederoSlice';

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Componente ListaBebederos
 * 
 * @param {Object} props - Propiedades del componente
 * @param {Array} [props.bebederos] - Lista opcional de bebederos
 */
const ListaBebederos = ({ bebederos: bebederosProp }) => {
    const dispatch = useDispatch();
    const bebederosStore = useSelector(state => state.bebederos.items);
    
    // Determinamos qué lista de bebederos mostrar
    const bebederosAMostrar = bebederosProp !== undefined ? bebederosProp : bebederosStore;
    
    /**
     * useEffect para cargar los bebederos al montar el componente
     */
    useEffect(() => {
        const fetchBebederos = async () => {
            try {
                const response = await axios.get(`${API_URL}/bebederos`);
                const bebederos = response.data.data;
                dispatch(setItems(bebederos));
            } catch (error) {
                console.error('Error al cargar bebederos:', error);
            }
        };
        
        fetchBebederos();
    }, [dispatch]);
    
    /**
     * Función helper para obtener la clase del badge según el estado
     */
    const getEstadoBadgeClass = (estado) => {
        switch (estado) {
            case 'operativo':
                return 'badge badge--operativo';
            case 'mantenimiento':
                return 'badge badge--mantenimiento';
            case 'fuera de servicio':
                return 'badge badge--fuera-de-servicio';
            default:
                return 'badge badge--default';
        }
    };
    
    return (
        <div className="bebederos-list">
            <h2 className="bebederos-list__title">Lista de Bebederos</h2>
            
            {bebederosAMostrar.length === 0 ? (
                <p className="bebederos-list__empty">No hay bebederos para mostrar</p>
            ) : (
                bebederosAMostrar.map(bebedero => (
                    <article key={bebedero._id} className="bebedero-card">
                        <h3 className="bebedero-card__title">
                            {bebedero.nombre}
                        </h3>
                        
                        <div className="bebedero-card__info">
                            <p className="bebedero-card__row">
                                <span className="bebedero-card__label">Ubicacion:</span>
                                {bebedero.ubicacion}
                            </p>
                            
                            <p className="bebedero-card__row">
                                <span className="bebedero-card__label">Estado:</span>
                                <span className={getEstadoBadgeClass(bebedero.estado)}>
                                    {bebedero.estado}
                                </span>
                            </p>
                            
                            <p className="bebedero-card__row">
                                <span className="bebedero-card__label">Caudal:</span>
                                {bebedero.caudal} L/min
                            </p>
                        </div>
                    </article>
                ))
            )}
        </div>
    );
};

export default ListaBebederos;
