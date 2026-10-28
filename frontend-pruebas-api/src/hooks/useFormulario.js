// =============================================================================
// HOOK useFormulario
// -----------------------------------------------------------------------------
// Maneja los valores, la validación y los errores de un formulario a partir de
// una lista de campos (ver src/config/grupos.js). También convierte los valores
// al formato que espera Spring Boot antes de enviarlos.
// =============================================================================

import { useState } from 'react';

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REGEX_TELEFONO = /^[0-9+\-\s]{7,15}$/;

// Valor vacío según el tipo de campo
function valorVacio(campo) {
  if (campo.valorInicial !== undefined) return campo.valorInicial;
  if (campo.tipo === 'booleano') return false;
  return '';
}

// Adapta un valor que viene de la API para mostrarlo en el input
function valorParaInput(campo, valor) {
  if (valor === null || valor === undefined) return valorVacio(campo);
  if (campo.tipo === 'fecha') return String(valor).slice(0, 10); // "2026-01-31"
  if (campo.tipo === 'fechaHora') return String(valor).slice(0, 16); // "2026-01-31T08:30"
  return valor;
}

// Convierte el valor del input al tipo que espera el backend (Java)
function valorParaApi(campo, valor) {
  if (campo.tipo === 'booleano') return Boolean(valor);
  if (valor === '' || valor === null || valor === undefined) return null;
  if (campo.tipo === 'numero') return Number(valor);
  // LocalDateTime en Java acepta "2026-01-31T08:30:00"
  if (campo.tipo === 'fechaHora' && String(valor).length === 16) return `${valor}:00`;
  return typeof valor === 'string' ? valor.trim() : valor;
}

// Reglas de validación. Devuelve el mensaje de error o null si el valor es válido.
function validarCampo(campo, valor) {
  const texto = typeof valor === 'string' ? valor.trim() : valor;
  const vacio = texto === '' || texto === null || texto === undefined;

  if (campo.requerido && vacio && campo.tipo !== 'booleano') return 'Este campo es obligatorio';
  if (vacio) return null;

  if (campo.tipo === 'email' && !REGEX_CORREO.test(texto)) return 'Escribe un correo válido';
  if (campo.tipo === 'telefono' && !REGEX_TELEFONO.test(texto)) return 'Escribe un teléfono válido (solo números)';
  if (campo.tipo === 'numero') {
    const numero = Number(texto);
    if (Number.isNaN(numero)) return 'Debe ser un número';
    if (campo.min !== undefined && numero < campo.min) return `El valor mínimo es ${campo.min}`;
    if (campo.max !== undefined && numero > campo.max) return `El valor máximo es ${campo.max}`;
  } else if (campo.max && String(texto).length > campo.max) {
    return `Máximo ${campo.max} caracteres`;
  }
  return null;
}

export function useFormulario(campos, valoresIniciales = null) {
  const [valores, setValores] = useState(() =>
    Object.fromEntries(campos.map((c) => [c.nombre, valorParaInput(c, valoresIniciales?.[c.nombre])])),
  );
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});

  const cambiar = (nombre, valor) => {
    setValores((actual) => ({ ...actual, [nombre]: valor }));
    // Si el campo ya tenía error, se revalida mientras el usuario escribe
    if (errores[nombre]) {
      const campo = campos.find((c) => c.nombre === nombre);
      setErrores((actual) => ({ ...actual, [nombre]: validarCampo(campo, valor) }));
    }
  };

  // Valida un campo cuando el usuario sale de él (evento blur)
  const tocar = (nombre) => {
    setTocados((actual) => ({ ...actual, [nombre]: true }));
    const campo = campos.find((c) => c.nombre === nombre);
    setErrores((actual) => ({ ...actual, [nombre]: validarCampo(campo, valores[nombre]) }));
  };

  // Valida todo el formulario. Devuelve true si no hay errores.
  const validarTodo = () => {
    const nuevosErrores = Object.fromEntries(campos.map((c) => [c.nombre, validarCampo(c, valores[c.nombre])]));
    setErrores(nuevosErrores);
    setTocados(Object.fromEntries(campos.map((c) => [c.nombre, true])));
    return Object.values(nuevosErrores).every((e) => !e);
  };

  // Objeto listo para enviar a la API
  const datosParaApi = () =>
    Object.fromEntries(campos.map((c) => [c.nombre, valorParaApi(c, valores[c.nombre])]));

  return { valores, errores, tocados, cambiar, tocar, validarTodo, datosParaApi };
}
