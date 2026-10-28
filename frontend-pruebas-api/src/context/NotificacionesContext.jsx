// =============================================================================
// CONTEXTO DE NOTIFICACIONES (toasts)
// -----------------------------------------------------------------------------
// Permite mostrar mensajes flotantes de éxito o error desde cualquier parte:
//
//   const { notificar } = useNotificaciones();
//   notificar('Empresa creada', 'exito');
// =============================================================================

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import Notificaciones from '../components/commons/Notificaciones';

const NotificacionesContext = createContext(null);

const DURACION_MS = 4500;

export function NotificacionesProvider({ children }) {
  const [lista, setLista] = useState([]);

  const cerrar = useCallback((id) => {
    setLista((actual) => actual.filter((n) => n.id !== id));
  }, []);

  const notificar = useCallback(
    (mensaje, tipo = 'info') => {
      const id = crypto.randomUUID?.() ?? String(Date.now() + Math.random());
      setLista((actual) => [...actual, { id, mensaje, tipo }]);
      setTimeout(() => cerrar(id), DURACION_MS);
    },
    [cerrar],
  );

  const valor = useMemo(() => ({ notificar }), [notificar]);

  return (
    <NotificacionesContext.Provider value={valor}>
      {children}
      <Notificaciones lista={lista} onCerrar={cerrar} />
    </NotificacionesContext.Provider>
  );
}

export function useNotificaciones() {
  const contexto = useContext(NotificacionesContext);
  if (!contexto) throw new Error('useNotificaciones debe usarse dentro de <NotificacionesProvider>');
  return contexto;
}
