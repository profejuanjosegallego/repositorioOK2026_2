// Contenedor de notificaciones flotantes (toasts). Lo usa NotificacionesContext.

import Icono from './Icono';

export default function Notificaciones({ lista, onCerrar }) {
  return (
    <div className="notificaciones" role="status" aria-live="polite">
      {lista.map((n) => (
        <div key={n.id} className={`notificacion notificacion--${n.tipo}`}>
          <Icono nombre={n.tipo === 'exito' ? 'exito' : n.tipo === 'error' ? 'error' : 'info'} tamano={20} />
          <p>{n.mensaje}</p>
          <button className="notificacion__cerrar" onClick={() => onCerrar(n.id)} aria-label="Cerrar notificación">
            <Icono nombre="cerrar" tamano={16} />
          </button>
          <span className="notificacion__progreso" />
        </div>
      ))}
    </div>
  );
}
