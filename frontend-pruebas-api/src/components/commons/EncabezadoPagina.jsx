// Encabezado con imagen para las páginas internas.

import Imagen from './Imagen';
import Icono from './Icono';

export default function EncabezadoPagina({ titulo, descripcion, imagen, icono, ruta, children }) {
  return (
    <section className="encabezado">
      <div className="encabezado__fondo">
        <Imagen src={imagen} alt="" />
      </div>
      <div className="encabezado__velo" aria-hidden="true" />
      <div className="contenedor encabezado__contenido">
        <div className="encabezado__textos">
          <span className="encabezado__icono entrada" style={{ '--retraso': '0ms' }}>
            <Icono nombre={icono} tamano={26} />
          </span>
          <h1 className="entrada" style={{ '--retraso': '100ms' }}>{titulo}</h1>
          <p className="entrada" style={{ '--retraso': '200ms' }}>{descripcion}</p>
          {ruta && (
            <code className="encabezado__ruta entrada" style={{ '--retraso': '300ms' }}>
              <Icono nombre="enlace" tamano={14} /> {ruta}
            </code>
          )}
        </div>
        <div className="encabezado__acciones entrada" style={{ '--retraso': '300ms' }}>{children}</div>
      </div>
    </section>
  );
}
