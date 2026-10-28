// Ventana modal con fondo difuminado. Se cierra con la tecla Escape o
// haciendo clic fuera del contenido.
// Uso: <Modal abierto={x} titulo="Nueva empresa" onCerrar={...}>...</Modal>

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Icono from './Icono';

export default function Modal({ abierto, titulo, subtitulo, onCerrar, children, ancho = 'normal' }) {
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e) => e.key === 'Escape' && onCerrar();
    document.addEventListener('keydown', alPresionar);
    document.body.style.overflow = 'hidden'; // evita el scroll de fondo
    return () => {
      document.removeEventListener('keydown', alPresionar);
      document.body.style.overflow = '';
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  // createPortal dibuja el modal al final del <body>, por encima de todo
  return createPortal(
    <div className="modal__fondo" onMouseDown={onCerrar}>
      <div
        className={`modal modal--${ancho}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="modal__encabezado">
          <div>
            <h2 id="modal-titulo">{titulo}</h2>
            {subtitulo && <p>{subtitulo}</p>}
          </div>
          <button className="modal__cerrar" onClick={onCerrar} aria-label="Cerrar">
            <Icono nombre="cerrar" />
          </button>
        </header>
        <div className="modal__cuerpo">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
