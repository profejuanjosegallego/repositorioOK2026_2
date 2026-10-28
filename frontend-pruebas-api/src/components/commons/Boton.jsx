// Botón reutilizable con variantes de estilo, ícono opcional y estado de carga.
// Uso: <Boton variante="primario" icono="mas" onClick={...}>Nuevo</Boton>
//
// Variantes: primario | secundario | fantasma | peligro | claro

import Icono from './Icono';

export default function Boton({
  children,
  variante = 'primario',
  icono,
  cargando = false,
  tamano = 'normal',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`boton boton--${variante} boton--${tamano} ${className}`}
      disabled={cargando || props.disabled}
      {...props}
    >
      {cargando ? <span className="boton__spinner" aria-hidden="true" /> : icono && <Icono nombre={icono} tamano={18} />}
      {children && <span>{children}</span>}
    </button>
  );
}
