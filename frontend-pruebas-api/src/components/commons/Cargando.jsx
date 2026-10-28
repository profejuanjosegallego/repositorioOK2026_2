// Esqueleto animado que se muestra mientras llegan los datos de la API.

export default function Cargando({ filas = 5, columnas = 4 }) {
  return (
    <div className="esqueleto" aria-label="Cargando datos" role="progressbar">
      {Array.from({ length: filas }).map((_, f) => (
        <div key={f} className="esqueleto__fila" style={{ animationDelay: `${f * 80}ms` }}>
          {Array.from({ length: columnas }).map((_, c) => (
            <span key={c} className="esqueleto__celda" />
          ))}
        </div>
      ))}
    </div>
  );
}
