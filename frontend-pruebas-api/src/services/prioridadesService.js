// =============================================================================
// SERVICIO DE PRIORIDADES
// -----------------------------------------------------------------------------
// Funciones para consumir la API de prioridades con fetch (a través de clienteHttp).
// Cada función corresponde a un endpoint del controlador en Spring Boot:
//
//   GET    /api/prioridades        -> listarPrioridades()
//   POST   /api/prioridades        -> crearPrioridad(datos)
//   PUT    /api/prioridades/{id}   -> modificarPrioridad(id, datos)
//   DELETE /api/prioridades/{id}   -> eliminarPrioridad(id)
//
// (La ruta exacta depende del grupo; se toma de src/config/grupos.js)
// =============================================================================

import { peticion, obtenerRuta } from './clienteHttp';

const RECURSO = 'prioridades';

// Trae la lista completa de prioridades
export function listarPrioridades() {
  return peticion(obtenerRuta(RECURSO));
}

// Crea una prioridad nueva. "datos" es un objeto con los campos del formulario.
export function crearPrioridad(datos) {
  return peticion(obtenerRuta(RECURSO), { metodo: 'POST', cuerpo: datos });
}

// Actualiza la prioridad con el id indicado
export function modificarPrioridad(id, datos) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'PUT', cuerpo: datos });
}

// Elimina la prioridad con el id indicado
export function eliminarPrioridad(id) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'DELETE' });
}

// Objeto con las 4 operaciones: lo usan las páginas y el hook useCrud
export const prioridadesService = {
  listar: listarPrioridades,
  crear: crearPrioridad,
  modificar: modificarPrioridad,
  eliminar: eliminarPrioridad,
};
