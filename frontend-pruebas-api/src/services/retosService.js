// =============================================================================
// SERVICIO DE RETOS
// -----------------------------------------------------------------------------
// Funciones para consumir la API de retos con fetch (a través de clienteHttp).
// Cada función corresponde a un endpoint del controlador en Spring Boot:
//
//   GET    /api/retos        -> listarRetos()
//   POST   /api/retos        -> crearReto(datos)
//   PUT    /api/retos/{id}   -> modificarReto(id, datos)
//   DELETE /api/retos/{id}   -> eliminarReto(id)
//
// (La ruta exacta depende del grupo; se toma de src/config/grupos.js)
// =============================================================================

import { peticion, obtenerRuta } from './clienteHttp';

const RECURSO = 'retos';

// Trae la lista completa de retos
export function listarRetos() {
  return peticion(obtenerRuta(RECURSO));
}

// Crea un reto nuevo. "datos" es un objeto con los campos del formulario.
export function crearReto(datos) {
  return peticion(obtenerRuta(RECURSO), { metodo: 'POST', cuerpo: datos });
}

// Actualiza el reto con el id indicado
export function modificarReto(id, datos) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'PUT', cuerpo: datos });
}

// Elimina el reto con el id indicado
export function eliminarReto(id) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'DELETE' });
}

// Objeto con las 4 operaciones: lo usan las páginas y el hook useCrud
export const retosService = {
  listar: listarRetos,
  crear: crearReto,
  modificar: modificarReto,
  eliminar: eliminarReto,
};
