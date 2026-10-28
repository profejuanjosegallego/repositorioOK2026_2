// =============================================================================
// CLIENTE HTTP (basado en fetch)
// -----------------------------------------------------------------------------
// Todas las peticiones a la API pasan por aquí. Centralizarlas tiene ventajas:
//   1. La URL base se define en un solo lugar.
//   2. Los errores se manejan igual en toda la aplicación.
//   3. Los servicios quedan cortos y fáciles de leer.
//
// 👉 En tu propio frontend puedes copiar este archivo casi sin cambios.
// =============================================================================

// Datos de conexión actuales. Los actualiza GrupoContext cuando el usuario
// cambia de grupo o de URL. Si solo trabajas con una API, puedes dejarlos fijos:
//   const URL_BASE = 'http://localhost:8080';
const conexion = {
  urlBase: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  rutas: {},
};

export function configurarConexion({ urlBase, rutas }) {
  if (urlBase) conexion.urlBase = urlBase.replace(/\/+$/, ''); // quita la "/" final
  if (rutas) conexion.rutas = rutas;
}

// Devuelve la ruta de un recurso, por ejemplo obtenerRuta('empresas') -> '/api/empresas'
export function obtenerRuta(recurso) {
  const ruta = conexion.rutas[recurso];
  if (!ruta) throw new Error(`No hay ruta configurada para "${recurso}"`);
  return ruta;
}

// Error propio para conocer el código HTTP que devolvió el servidor
export class ErrorApi extends Error {
  constructor(mensaje, estado) {
    super(mensaje);
    this.name = 'ErrorApi';
    this.estado = estado;
  }
}

// Mensajes en español según el código de estado HTTP
function mensajeSegunEstado(estado) {
  const mensajes = {
    400: 'Los datos enviados no son válidos.',
    404: 'El recurso no existe en el servidor.',
    405: 'El servidor no permite esta operación en esta ruta.',
    409: 'Ya existe un registro con esos datos (valor duplicado).',
    500: 'Error interno del servidor. Revisa que los datos cumplan las reglas de la base de datos (campos únicos, obligatorios, longitud).',
  };
  return mensajes[estado] || `El servidor respondió con el código ${estado}.`;
}

/**
 * Hace una petición HTTP y devuelve la respuesta ya convertida a JSON.
 *
 * @param {string} ruta    Ruta relativa, por ejemplo '/api/empresas'
 * @param {object} opciones { metodo: 'GET' | 'POST' | 'PUT' | 'DELETE', cuerpo: objeto a enviar }
 */
export async function peticion(ruta, { metodo = 'GET', cuerpo } = {}) {
  const url = `${conexion.urlBase}${ruta}`;

  let respuesta;
  try {
    respuesta = await fetch(url, {
      method: metodo,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // Solo se envía cuerpo en POST y PUT. JSON.stringify convierte el objeto en texto JSON.
      body: cuerpo !== undefined ? JSON.stringify(cuerpo) : undefined,
    });
  } catch {
    // fetch solo lanza excepción cuando no hay conexión (servidor apagado, URL mala o CORS)
    throw new ErrorApi(
      `No fue posible conectar con ${conexion.urlBase}. ¿El backend está encendido y tiene CORS habilitado?`,
      0,
    );
  }

  // fetch NO lanza error con códigos 4xx o 5xx: hay que revisar respuesta.ok
  if (!respuesta.ok) {
    let detalle = '';
    try {
      const cuerpoError = await respuesta.json();
      detalle = cuerpoError.message || cuerpoError.error || '';
    } catch {
      /* la respuesta de error no traía JSON */
    }
    const base = mensajeSegunEstado(respuesta.status);
    throw new ErrorApi(detalle && detalle !== 'Internal Server Error' ? `${base} (${detalle})` : base, respuesta.status);
  }

  // Algunas respuestas no traen cuerpo (por ejemplo 204 No Content)
  const texto = await respuesta.text();
  return texto ? JSON.parse(texto) : null;
}
