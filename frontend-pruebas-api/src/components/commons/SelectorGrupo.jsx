// Permite elegir qué API (grupo) se está probando y la URL de su backend.

import { useEffect, useState } from 'react';
import { GRUPOS } from '../../config/grupos';
import { useGrupo } from '../../context/GrupoContext';
import Icono from './Icono';

export default function SelectorGrupo() {
  const { grupo, urlBase, cambiarGrupo, cambiarUrlBase } = useGrupo();
  const [url, setUrl] = useState(urlBase);

  // Si la URL cambia desde fuera, se sincroniza el input
  useEffect(() => {
    setUrl(urlBase);
  }, [urlBase]);

  const aplicarUrl = () => {
    const limpia = url.trim();
    if (limpia && limpia !== urlBase) cambiarUrlBase(limpia);
  };

  return (
    <div className="selector-grupo">
      <label className="selector-grupo__campo">
        <span>API</span>
        <select value={grupo.id} onChange={(e) => cambiarGrupo(e.target.value)} aria-label="Grupo a probar">
          {GRUPOS.map((g) => (
            <option key={g.id} value={g.id}>{g.nombre}</option>
          ))}
        </select>
      </label>
      <label className="selector-grupo__campo selector-grupo__url">
        <Icono nombre="servidor" tamano={15} />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onBlur={aplicarUrl}
          onKeyDown={(e) => e.key === 'Enter' && aplicarUrl()}
          aria-label="URL del backend"
          spellCheck={false}
        />
      </label>
    </div>
  );
}
