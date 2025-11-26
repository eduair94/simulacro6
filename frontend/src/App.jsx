/**
 * Componente principal de la aplicación
 * 
 * Este es el componente raíz que contiene toda la aplicación.
 * Renderiza el contenedor de bebederos con la funcionalidad completa.
 */

import BebederosContainer from './components/BebederosContainer';
import './App.css';

function App() {
    return (
        <div className="App">
            {/* Header de la aplicación */}
            <header style={{
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '20px',
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                <h1 style={{ margin: 0 }}>�� Sistema de Bebederos</h1>
                <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
                    Simulacro 6 - Gestión de Bebederos Públicos
                </p>
            </header>
            
            {/* Contenido principal */}
            <main style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 20px',
                width: '100%',
                boxSizing: 'border-box'
            }}>
                {/* 
                  BebederosContainer incluye:
                  - Botón de filtro (Punto 7)
                  - ListaBebederos (Punto 6)
                */}
                <BebederosContainer />
            </main>
            
            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '20px',
                marginTop: '40px',
                borderTop: '1px solid #ddd',
                color: '#666'
            }}>
                <p>API: https://api.bebederos.uy (localhost:3001 para desarrollo)</p>
            </footer>
        </div>
    );
}

export default App;
