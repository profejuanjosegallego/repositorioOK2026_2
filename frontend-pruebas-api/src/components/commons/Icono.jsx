// Íconos SVG en línea (estilo trazo). No requieren ninguna librería externa.
// Uso: <Icono nombre="empresa" tamano={20} />

const TRAZOS = {
  empresa: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1',
  categoria: 'M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8ZM7.5 7.5h.01',
  prioridad: 'M4 22V15M4 15V3c4-2 8 2 16 0v12c-8 2-12-2-16 0Z',
  reto: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-4a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  registro: 'M9 4h6a1 1 0 0 1 1 1v1H8V5a1 1 0 0 1 1-1ZM8 6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2M9 13l2 2 4-4',
  inicio: 'M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5',
  mas: 'M12 5v14M5 12h14',
  editar: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z',
  eliminar: 'M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v6M14 11v6',
  buscar: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3',
  refrescar: 'M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8M21 4v5h-5M3 20v-5h5',
  cerrar: 'M18 6 6 18M6 6l12 12',
  exito: 'M22 11.1V12a10 10 0 1 1-5.9-9.1M22 4 12 14l-3-3',
  error: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 8v4m0 4h.01',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM12 16v-4m0-4h.01',
  flecha: 'M5 12h14m-6-6 6 6-6 6',
  servidor: 'M4 3h16v6H4zM4 15h16v6H4zM8 6h.01M8 18h.01',
  codigo: 'm16 18 6-6-6-6M8 6l-6 6 6 6',
  capas: 'm12 2 10 5-10 5L2 7Zm-10 10 10 5 10-5M2 17l10 5 10-5',
  menu: 'M4 6h16M4 12h16M4 18h16',
  vacio: 'M21 8 12 3 3 8v8l9 5 9-5ZM3 8l9 5 9-5M12 13v8',
  enlace: 'M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7',
};

export default function Icono({ nombre, tamano = 20, className = '', grosor = 2 }) {
  const trazo = TRAZOS[nombre] ?? TRAZOS.info;
  return (
    <svg
      className={`icono ${className}`}
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={trazo} />
    </svg>
  );
}
