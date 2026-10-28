// =============================================================================
// SERVICIO DE EMPRESAS
// -----------------------------------------------------------------------------
// Funciones para consumir la API de empresas con fetch (a través de clienteHttp).
// Cada función corresponde a un endpoint del controlador en Spring Boot:
//
//   GET    /api/empresas        -> listarEmpresas()
//   POST   /api/empresas        -> crearEmpresa(datos)
//   PUT    /api/empresas/{id}   -> modificarEmpresa(id, datos)
//   DELETE /api/empresas/{id}   -> eliminarEmpresa(id)
//
// (La ruta exacta depende del grupo; se toma de src/config/grupos.js)
// =============================================================================

import { peticion, obtenerRuta } from './clienteHttp';

const RECURSO = 'empresas';

// Trae la lista completa de empresas
export function listarEmpresas() {
  return peticion(obtenerRuta(RECURSO));
}

// Crea una empresa nueva. "datos" es un objeto con los campos del formulario.
export function crearEmpresa(datos) {
  return peticion(obtenerRuta(RECURSO), { metodo: 'POST', cuerpo: datos });
}

// Actualiza la empresa con el id indicado
export function modificarEmpresa(id, datos) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'PUT', cuerpo: datos });
}

// Elimina la empresa con el id indicado
export function eliminarEmpresa(id) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'DELETE' });
}

// Objeto con las 4 operaciones: lo usan las páginas y el hook useCrud
export const empresasService = {
  listar: listarEmpresas,
  crear: crearEmpresa,
  modificar: modificarEmpresa,
  eliminar: eliminarEmpresa,
};
