// Envoltorio que anima a sus hijos cuando entran en pantalla al hacer scroll.
// Uso: <Aparecer retraso={150}><Tarjeta /></Aparecer>

import { useAparecer } from '../../hooks/useAparecer';

export default function Aparecer({ children, retraso = 0, como: Etiqueta = 'div', className = '' }) {
  const [ref, visible] = useAparecer();
  return (
    <Etiqueta
      ref={ref}
      className={`aparecer ${visible ? 'aparecer--visible' : ''} ${className}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      {children}
    </Etiqueta>
  );
}
