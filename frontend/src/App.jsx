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
        <div className="app">
            {/* Header de la aplicación */}
            <header className="header">
                <h1 className="header__title">Sistema de Bebederos</h1>
                <p className="header__subtitle">
                    Simulacro 6 - Gestión de Bebederos Públicos
                </p>
            </header>
            
            {/* Contenido principal */}
            <main className="main">
                <div className="main__container">
                    {/* 
                      BebederosContainer incluye:
                      - Botón de filtro (Punto 7)
                      - ListaBebederos (Punto 6)
                    */}
                    <BebederosContainer />
                </div>
            </main>
            
            {/* Footer */}
            <footer className="footer">
                <p className="footer__text">Simulacro 6 - Programación Full Stack</p>
            </footer>
        </div>
    );
}

export default App;
