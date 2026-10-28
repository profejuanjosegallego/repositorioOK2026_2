// =============================================================================
// HOOK useAparecer
// -----------------------------------------------------------------------------
// Detecta cuando un elemento entra en pantalla (IntersectionObserver) para
// animarlo al hacer scroll. Devuelve una ref para el elemento y un booleano.
// =============================================================================

import { useEffect, useRef, useState } from 'react';

export function useAparecer({ umbral = 0.15 } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const elemento = ref.current;
    if (!elemento) return;

    // Navegadores sin soporte: se muestra directamente
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect(); // solo se anima la primera vez
        }
      },
      { threshold: umbral },
    );
    observador.observe(elemento);
    return () => observador.disconnect();
  }, [umbral]);

  return [ref, visible];
}
