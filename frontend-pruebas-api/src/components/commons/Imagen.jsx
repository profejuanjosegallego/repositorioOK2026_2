// Imagen en línea con efecto de carga suave y una imagen de respaldo
// por si la URL original falla.

import { useState } from 'react';

export default function Imagen({ src, alt, className = '', respaldo }) {
  const [cargada, setCargada] = useState(false);
  const [fuente, setFuente] = useState(src);

  const alFallar = () => {
    // Si la imagen falla, se usa una imagen aleatoria de picsum.photos
    const alterna = respaldo || `https://picsum.photos/seed/${encodeURIComponent(alt || 'retolab')}/1200/800`;
    if (fuente !== alterna) setFuente(alterna);
  };

  return (
    <img
      src={fuente}
      alt={alt}
      loading="lazy"
      className={`imagen ${cargada ? 'imagen--cargada' : ''} ${className}`}
      onLoad={() => setCargada(true)}
      onError={alFallar}
    />
  );
}
