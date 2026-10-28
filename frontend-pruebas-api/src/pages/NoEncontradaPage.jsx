// Página para rutas que no existen (error 404).

import { Link } from 'react-router-dom';
import Icono from '../components/commons/Icono';

export default function NoEncontradaPage() {
  return (
    <section className="no-encontrada contenedor">
      <span className="no-encontrada__codigo texto-degradado">404</span>
      <h1>Esta página no existe</h1>
      <p>Revisa la dirección o vuelve al inicio para elegir un recurso.</p>
      <Link to="/" className="boton boton--primario boton--grande">
        <Icono nombre="inicio" tamano={18} /> <span>Volver al inicio</span>
      </Link>
    </section>
  );
}
