// =============================================================================
// HOOK useCrud
// -----------------------------------------------------------------------------
// Reúne la lógica de listar, crear, modificar y eliminar de cualquier recurso.
// Recibe un "servicio" con las funciones listar, crear, modificar y eliminar
// (ver src/services) y devuelve los datos y el estado de carga listos para
// usar en una página.
//
//   const { datos, cargando, error, crear } = useCrud(empresasService);
// =============================================================================

import { useCallback, useEffect, useState } from 'react';
import { useGrupo } from '../context/GrupoContext';
import { useNotificaciones } from '../context/NotificacionesContext';

// "conArticulo" se usa en los mensajes, por ejemplo: 'la empresa' o 'el reto'
export function useCrud(servicio, conArticulo = 'el registro') {
  const { grupo, urlBase } = useGrupo();
  const { notificar } = useNotificaciones();

  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ---- LISTAR ----
  const cargar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await servicio.listar();
      setDatos(Array.isArray(respuesta) ? respuesta : []);
    } catch (e) {
      setError(e.message);
      setDatos([]);
    } finally {
      setCargando(false);
    }
  }, [servicio]);

  // Se vuelve a cargar cuando cambia el grupo o la URL del backend
  useEffect(() => {
    cargar();
  }, [cargar, grupo.id, urlBase]);

  // Ejecuta una operación, muestra la notificación y recarga la lista.
  // Devuelve true si salió bien, para que el formulario sepa si debe cerrarse.
  const ejecutar = async (operacion, mensajeExito) => {
    try {
      await operacion();
      notificar(mensajeExito, 'exito');
      await cargar();
      return true;
    } catch (e) {
      notificar(e.message, 'error');
      return false;
    }
  };

  // ---- CREAR, MODIFICAR y ELIMINAR ----
  const crear = (valores) =>
    ejecutar(() => servicio.crear(valores), `Se creó ${conArticulo} correctamente`);

  const modificar = (id, valores) =>
    ejecutar(() => servicio.modificar(id, valores), `Se actualizó ${conArticulo} correctamente`);

  const eliminar = (id) =>
    ejecutar(() => servicio.eliminar(id), `Se eliminó ${conArticulo} correctamente`);

  return { datos, cargando, error, cargar, crear, modificar, eliminar };
}
