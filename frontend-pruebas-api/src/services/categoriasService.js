// =============================================================================
// SERVICIO DE CATEGORIAS
// -----------------------------------------------------------------------------
// Funciones para consumir la API de categorías con fetch (a través de clienteHttp).
// Cada función corresponde a un endpoint del controlador en Spring Boot:
//
//   GET    /api/categorias        -> listarCategorias()
//   POST   /api/categorias        -> crearCategoria(datos)
//   PUT    /api/categorias/{id}   -> modificarCategoria(id, datos)
//   DELETE /api/categorias/{id}   -> eliminarCategoria(id)
//
// (La ruta exacta depende del grupo; se toma de src/config/grupos.js)
// =============================================================================

import { peticion, obtenerRuta } from './clienteHttp';

const RECURSO = 'categorias';

// Trae la lista completa de categorías
export function listarCategorias() {
  return peticion(obtenerRuta(RECURSO));
}

// Crea una categoría nueva. "datos" es un objeto con los campos del formulario.
export function crearCategoria(datos) {
  return peticion(obtenerRuta(RECURSO), { metodo: 'POST', cuerpo: datos });
}

// Actualiza la categoría con el id indicado
export function modificarCategoria(id, datos) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'PUT', cuerpo: datos });
}

// Elimina la categoría con el id indicado
export function eliminarCategoria(id) {
  return peticion(`${obtenerRuta(RECURSO)}/${id}`, { metodo: 'DELETE' });
}

// Objeto con las 4 operaciones: lo usan las páginas y el hook useCrud
export const categoriasService = {
  listar: listarCategorias,
  crear: crearCategoria,
  modificar: modificarCategoria,
  eliminar: eliminarCategoria,
};
