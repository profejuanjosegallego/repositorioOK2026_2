// Pie de página.

import { Link } from 'react-router-dom';
import { RECURSOS } from '../../config/recursos';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor footer__contenido">
        <div>
          <Link to="/" className="marca">
            <span className="marca__logo">R</span>
            <span className="marca__texto">Reto<strong>Lab</strong></span>
          </Link>
          <p className="footer__texto">
            Panel de pruebas para las APIs del proyecto de retos empresariales. Hecho con React, Vite y fetch.
          </p>
        </div>
        <nav className="footer__enlaces" aria-label="Recursos">
          {RECURSOS.map((r) => (
            <Link key={r.clave} to={r.ruta}>{r.titulo}</Link>
          ))}
        </nav>
      </div>
      <div className="contenedor footer__legal">
        <span>Jornada Sábado · {new Date().getFullYear()}</span>
        <span>Imágenes: Unsplash</span>
      </div>
    </footer>
  );
}
