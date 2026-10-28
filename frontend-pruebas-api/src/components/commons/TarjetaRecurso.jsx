// Tarjeta con imagen para navegar a la página de un recurso.

import { Link } from 'react-router-dom';
import Imagen from './Imagen';
import Icono from './Icono';

export default function TarjetaRecurso({ recurso, estado }) {
  return (
    <Link to={recurso.ruta} className="tarjeta-recurso">
      <div className="tarjeta-recurso__imagen">
        <div className="tarjeta-recurso__marco">
          <Imagen src={recurso.imagen} alt={recurso.titulo} />
        </div>
        <span className="tarjeta-recurso__icono">
          <Icono nombre={recurso.icono} tamano={22} />
        </span>
      </div>
      <div className="tarjeta-recurso__cuerpo">
        <h3>{recurso.titulo}</h3>
        <p>{recurso.descripcion}</p>
        <div className="tarjeta-recurso__pie">
          {estado}
          <span className="tarjeta-recurso__ir">
            Abrir <Icono nombre="flecha" tamano={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
