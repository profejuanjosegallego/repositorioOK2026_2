// =============================================================================
// SERVICIO DE REGISTROS
// -----------------------------------------------------------------------------
// Funciones para consumir la API de registros con fetch (a través de clienteHttp).
// Cada función corresponde a un endpoint del controlador en Spring Boot:
//
//   GET    /api/registros        -> listarRegistros()
//   POST   /api/registros        -> crearRegistro(datos)
//   PUT    /api/registros/{id}   -> modificarRegistro(id, datos)
//   DELETE /api/registros/{id}   -> eliminarRegistro(id)
//
// (La ruta exacta depende del grupo; se toma de src/config/grupos.js)
// =============================================================================

import { peticion, obtenerRuta } from './clienteHttp';

const RECURSO = 'registros';

// Trae la lista completa de registros
export function listarRegistros() {
  return peticion(obtenerRuta(RECURSO));
}

// Crea un registro nuevo. "datos" es un objeto con los campos del formulario.
export function crearRegistro(datos) {
  return peticion(obtenerRuta(RECURSO), { metodo: 'POST', cuerpo: datos });
}

// Actualiza el registro con el id indicado
export function modificarRegistro(id, datos) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'PUT', cuerpo: datos });
}

// Elimina el registro con el id indicado
export function eliminarRegistro(id) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'DELETE' });
}

// Objeto con las 4 operaciones: lo usan las páginas y el hook useCrud
export const registrosService = {
  listar: listarRegistros,
  crear: crearRegistro,
  modificar: modificarRegistro,
  eliminar: eliminarRegistro,
};
