// =============================================================================
// COMPONENTE RAÍZ
// -----------------------------------------------------------------------------
// Define los proveedores de contexto, la estructura general (navbar, contenido
// y footer) y las rutas de la aplicación.
// =============================================================================

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { GrupoProvider } from './context/GrupoContext';
import { NotificacionesProvider } from './context/NotificacionesContext';
import Navbar from './components/commons/Navbar';
import Footer from './components/commons/Footer';
import InicioPage from './pages/InicioPage';
import EmpresasPage from './pages/EmpresasPage';
import CategoriasPage from './pages/CategoriasPage';
import PrioridadesPage from './pages/PrioridadesPage';
import RetosPage from './pages/RetosPage';
import RegistrosPage from './pages/RegistrosPage';
import NoEncontradaPage from './pages/NoEncontradaPage';

// Vuelve al inicio de la página cada vez que cambia la ruta
function SubirAlCambiarRuta() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <GrupoProvider>
        <NotificacionesProvider>
          <SubirAlCambiarRuta />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<InicioPage />} />
              <Route path="/empresas" element={<EmpresasPage />} />
              <Route path="/categorias" element={<CategoriasPage />} />
              <Route path="/prioridades" element={<PrioridadesPage />} />
              <Route path="/retos" element={<RetosPage />} />
              <Route path="/registros" element={<RegistrosPage />} />
              <Route path="*" element={<NoEncontradaPage />} />
            </Routes>
          </main>
          <Footer />
        </NotificacionesProvider>
      </GrupoProvider>
    </BrowserRouter>
  );
}
