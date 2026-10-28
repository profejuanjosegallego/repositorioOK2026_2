// Tabla de datos con buscador, formato por tipo de campo y acciones por fila.
// Las columnas se generan a partir de la configuración de campos.

import { useMemo, useState } from 'react';
import Icono from './Icono';

const formatoFecha = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
const formatoFechaHora = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

// Convierte "2026-01-31" en fecha local sin que cambie el día por la zona horaria
function aFecha(valor, conHora) {
  if (!conHora && /^\d{4}-\d{2}-\d{2}$/.test(valor)) {
    const [a, m, d] = valor.split('-').map(Number);
    return new Date(a, m - 1, d);
  }
  return new Date(valor);
}

// Muestra cada valor según su tipo
function mostrarValor(campo, valor) {
  if (valor === null || valor === undefined || valor === '') return <span className="tabla__nulo">—</span>;

  switch (campo.tipo) {
    case 'booleano':
      return <span className={`insignia ${valor ? 'insignia--exito' : 'insignia--apagada'}`}>{valor ? 'Sí' : 'No'}</span>;
    case 'fecha':
    case 'fechaHora': {
      const fecha = aFecha(valor, campo.tipo === 'fechaHora');
      return Number.isNaN(fecha.getTime()) ? valor : (campo.tipo === 'fecha' ? formatoFecha : formatoFechaHora).format(fecha);
    }
    case 'seleccion':
      return <span className={`insignia insignia--${String(valor).replace(/\s+/g, '-')}`}>{valor}</span>;
    case 'numero':
      return <span className="tabla__numero">{valor}</span>;
    case 'textoLargo':
      return <span className="tabla__largo" title={valor}>{valor}</span>;
    default:
      return valor;
  }
}

export default function TablaDatos({ campos, datos, onEditar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');

  // Filtra las filas que contengan el texto buscado en cualquier campo
  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    if (!texto) return datos;
    return datos.filter((fila) => campos.some((c) => String(fila[c.nombre] ?? '').toLowerCase().includes(texto)));
  }, [datos, campos, busqueda]);

  return (
    <div className="tabla">
      <div className="tabla__barra">
        <label className="buscador">
          <Icono nombre="buscar" tamano={18} />
          <input type="search" placeholder="Buscar en la tabla…" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} aria-label="Buscar" />
        </label>
        <span className="tabla__conteo">
          {filtrados.length} de {datos.length} {datos.length === 1 ? 'resultado' : 'resultados'}
        </span>
      </div>

      <div className="tabla__contenedor">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {campos.map((c) => <th key={c.nombre}>{c.etiqueta}</th>)}
              <th className="tabla__acciones-th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((fila, i) => (
              <tr key={fila.id ?? i} style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}>
                <td><code className="tabla__id" title={fila.id}>{String(fila.id ?? '').slice(0, 8)}</code></td>
                {campos.map((c) => <td key={c.nombre}>{mostrarValor(c, fila[c.nombre])}</td>)}
                <td>
                  <div className="tabla__acciones">
                    <button className="accion accion--editar" onClick={() => onEditar(fila)} aria-label="Editar" title="Editar">
                      <Icono nombre="editar" tamano={17} />
                    </button>
                    <button className="accion accion--eliminar" onClick={() => onEliminar(fila)} aria-label="Eliminar" title="Eliminar">
                      <Icono nombre="eliminar" tamano={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtrados.length === 0 && <p className="tabla__sin-resultados">Ningún resultado coincide con “{busqueda}”.</p>}
      </div>
    </div>
  );
}
