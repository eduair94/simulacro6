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
        <div className="App" style={{ 
            minHeight: '100vh', 
            backgroundColor: '#f0f2f5',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Header de la aplicación */}
            <header style={{
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '20px',
                textAlign: 'center'
            }}>
                <h1 style={{ margin: 0 }}>Sistema de Bebederos</h1>
                <p style={{ margin: '8px 0 0 0', opacity: 0.9 }}>
                    Simulacro 6 - Gestión de Bebederos Públicos
                </p>
            </header>
            
            {/* Contenido principal */}
            <main style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                padding: '30px 20px'
            }}>
                <div style={{
                    width: '100%',
                    maxWidth: '1000px',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                    padding: '30px'
                }}>
                    {/* 
                      BebederosContainer incluye:
                      - Botón de filtro (Punto 7)
                      - ListaBebederos (Punto 6)
                    */}
                    <BebederosContainer />
                </div>
            </main>
            
            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '20px',
                backgroundColor: '#f0f2f5',
                borderTop: '1px solid #ddd',
                color: '#666'
            }}>
                <p style={{ margin: 0 }}>Simulacro 6 - Programación Full Stack</p>
            </footer>
        </div>
    );
}

export default App;
