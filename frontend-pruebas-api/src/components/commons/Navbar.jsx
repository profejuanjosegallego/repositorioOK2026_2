// Barra de navegación fija. Se vuelve sólida al hacer scroll y en celulares
// muestra un menú desplegable.

import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { RECURSOS } from '../../config/recursos';
import SelectorGrupo from './SelectorGrupo';
import Icono from './Icono';

export default function Navbar() {
  const [conScroll, setConScroll] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const alHacerScroll = () => setConScroll(window.scrollY > 24);
    alHacerScroll();
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    return () => window.removeEventListener('scroll', alHacerScroll);
  }, []);

  // Cierra el menú móvil al cambiar de página
  useEffect(() => {
    setMenuAbierto(false);
  }, [pathname]);

  const sobreBanner = pathname === '/' && !conScroll && !menuAbierto;

  return (
    <header className={`navbar ${sobreBanner ? 'navbar--transparente' : 'navbar--solida'}`}>
      <div className="navbar__contenido contenedor">
        <Link to="/" className="marca" aria-label="Ir al inicio">
          <span className="marca__logo">R</span>
          <span className="marca__texto">Reto<strong>Lab</strong></span>
        </Link>

        <nav className={`navbar__menu ${menuAbierto ? 'navbar__menu--abierto' : ''}`} aria-label="Principal">
          <NavLink to="/" end className="navbar__enlace">
            <Icono nombre="inicio" tamano={17} /> Inicio
          </NavLink>
          {RECURSOS.map((r) => (
            <NavLink key={r.clave} to={r.ruta} className="navbar__enlace">
              <Icono nombre={r.icono} tamano={17} /> {r.titulo}
            </NavLink>
          ))}
          <div className="navbar__selector-movil">
            <SelectorGrupo />
          </div>
        </nav>

        <div className="navbar__selector">
          <SelectorGrupo />
        </div>

        <button className="navbar__hamburguesa" onClick={() => setMenuAbierto((v) => !v)} aria-label="Abrir menú" aria-expanded={menuAbierto}>
          <Icono nombre={menuAbierto ? 'cerrar' : 'menu'} />
        </button>
      </div>
    </header>
  );
}
