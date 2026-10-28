// =============================================================================
// CONTEXTO DEL GRUPO SELECCIONADO
// -----------------------------------------------------------------------------
// Guarda qué grupo (API) se está probando y en qué URL corre su backend.
// Cualquier componente puede leerlo con el hook useGrupo().
//
// 👉 Si tu frontend es solo para tu grupo, no necesitas este contexto.
// =============================================================================

import { createContext, useContext, useMemo, useState } from 'react';
import { buscarGrupo, GRUPO_POR_DEFECTO } from '../config/grupos';
import { configurarConexion } from '../services/clienteHttp';

const GrupoContext = createContext(null);

const URL_POR_DEFECTO = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// localStorage puede fallar (modo privado, permisos), por eso va en try/catch
function leerPreferencia(clave, valorPorDefecto) {
  try {
    return localStorage.getItem(clave) ?? valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

function guardarPreferencia(clave, valor) {
  try {
    localStorage.setItem(clave, valor);
  } catch {
    /* sin almacenamiento disponible: no pasa nada */
  }
}

export function GrupoProvider({ children }) {
  const [grupoId, setGrupoId] = useState(() => leerPreferencia('grupo', GRUPO_POR_DEFECTO.id));
  const [urlBase, setUrlBase] = useState(() => leerPreferencia('urlBase', URL_POR_DEFECTO));

  const grupo = buscarGrupo(grupoId);

  // Se actualiza la conexión del cliente HTTP ANTES de que los hijos hagan peticiones
  configurarConexion({ urlBase, rutas: grupo.rutas });

  const valor = useMemo(
    () => ({
      grupo,
      urlBase,
      cambiarGrupo: (id) => {
        setGrupoId(id);
        guardarPreferencia('grupo', id);
      },
      cambiarUrlBase: (url) => {
        setUrlBase(url);
        guardarPreferencia('urlBase', url);
      },
    }),
    [grupo, urlBase],
  );

  return <GrupoContext.Provider value={valor}>{children}</GrupoContext.Provider>;
}

export function useGrupo() {
  const contexto = useContext(GrupoContext);
  if (!contexto) throw new Error('useGrupo debe usarse dentro de <GrupoProvider>');
  return contexto;
}
