// =============================================================================
// CONFIGURACIÓN DE LOS GRUPOS
// -----------------------------------------------------------------------------
// Las 6 APIs manejan los mismos recursos (empresas, categorías, prioridades,
// retos y registros), pero cada grupo nombró sus rutas y campos de forma
// distinta. Aquí se describe cada API para que el frontend se adapte a ella.
//
// 👉 Si construyes tu propio frontend solo para tu grupo, no necesitas este
//    archivo: puedes escribir directamente tus rutas y campos en tus servicios
//    y formularios.
//
// Tipos de campo disponibles (los usa el componente <Campo />):
//   texto, textoLargo, email, telefono, numero, fecha, fechaHora, booleano, seleccion
// =============================================================================

// ---- Campos que se repiten en varios grupos (para no escribirlos 6 veces) ----

const ESTADOS_RETO = ['abierto', 'en progreso', 'cerrado'];
const ESTADOS_REGISTRO = ['pendiente', 'revisado', 'aprobado'];

// Campos de empresa. El grupo 4 usa "activo" en lugar de "activa".
const camposEmpresa = (campoActivo = 'activa') => [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto', requerido: true, max: 50, placeholder: 'Ej: Innova S.A.S.' },
  { nombre: 'nit', etiqueta: 'NIT', tipo: 'texto', requerido: true, max: 20, placeholder: 'Ej: 900123456-7' },
  { nombre: 'sector', etiqueta: 'Sector', tipo: 'texto', requerido: true, max: 30, placeholder: 'Ej: Tecnología' },
  { nombre: 'contacto', etiqueta: 'Persona de contacto', tipo: 'texto', requerido: true, max: 50, placeholder: 'Ej: Ana Gómez' },
  { nombre: 'correo', etiqueta: 'Correo', tipo: 'email', requerido: true, max: 80, placeholder: 'contacto@empresa.com' },
  { nombre: 'telefono', etiqueta: 'Teléfono', tipo: 'telefono', requerido: true, max: 10, placeholder: '3001234567' },
  { nombre: campoActivo, etiqueta: 'Empresa activa', tipo: 'booleano', valorInicial: true },
];

const categoriaSimple = [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto', requerido: true, max: 50, placeholder: 'Ej: Innovación' },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textoLargo', requerido: true, max: 100 },
];

const prioridadConNivel = [
  { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto', requerido: true, max: 50, placeholder: 'Ej: Alta' },
  { nombre: 'nivel', etiqueta: 'Nivel', tipo: 'numero', requerido: true, min: 1, max: 10, placeholder: '1 = más urgente' },
];

// Reto con nombre, descripción, dos fechas y estado.
// Cada grupo nombró las fechas distinto y algunas son fecha + hora.
const retoBasico = (inicio, fin, tipoFecha = 'fecha') => [
  { nombre: 'nombre', etiqueta: 'Nombre del reto', tipo: 'texto', requerido: true, max: 50 },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textoLargo', requerido: true, max: 200 },
  { nombre: inicio, etiqueta: 'Fecha de inicio', tipo: tipoFecha, requerido: true },
  { nombre: fin, etiqueta: 'Fecha de fin', tipo: tipoFecha, requerido: true },
  { nombre: 'estado', etiqueta: 'Estado', tipo: 'seleccion', opciones: ESTADOS_RETO, requerido: true },
];

const registroObservacion = (campoFecha) => [
  { nombre: campoFecha, etiqueta: 'Fecha del registro', tipo: 'fechaHora', requerido: true },
  { nombre: 'observacion', etiqueta: 'Observación', tipo: 'textoLargo', requerido: true, max: 200 },
  { nombre: 'estado', etiqueta: 'Estado', tipo: 'seleccion', opciones: ESTADOS_REGISTRO, requerido: true },
];

const registroTipo = [
  { nombre: 'tipo', etiqueta: 'Tipo', tipo: 'seleccion', opciones: ['avance', 'novedad', 'cierre'], requerido: true },
  { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textoLargo', requerido: true, max: 200 },
  { nombre: 'fecha', etiqueta: 'Fecha', tipo: 'fechaHora', requerido: true },
];

const RUTAS_PLURAL = {
  empresas: '/api/empresas',
  categorias: '/api/categorias',
  prioridades: '/api/prioridades',
  retos: '/api/retos',
  registros: '/api/registros',
};

// ---- Definición de cada grupo ----

export const GRUPOS = [
  {
    id: '1',
    nombre: 'Grupo 1 · Synkro',
    proyecto: 'beta_1_synkro',
    rutas: RUTAS_PLURAL,
    campos: {
      empresas: camposEmpresa(),
      categorias: [
        { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto', requerido: true, max: 50 },
        { nombre: 'categoria', etiqueta: 'Categoría', tipo: 'texto', requerido: true, max: 80 },
        { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textoLargo', requerido: true, max: 400 },
      ],
      prioridades: prioridadConNivel,
      retos: retoBasico('fecha_inicio', 'fecha_fin'),
      registros: registroObservacion('fechaRegistro'),
    },
  },
  {
    id: '2',
    nombre: 'Grupo 2 · Bizti',
    proyecto: 'beta_1_Bizti',
    rutas: RUTAS_PLURAL,
    campos: {
      empresas: camposEmpresa(),
      categorias: categoriaSimple,
      prioridades: prioridadConNivel,
      retos: retoBasico('fecha_inicio', 'fecha_fin'),
      registros: registroObservacion('fechaRegistros'),
    },
  },
  {
    id: '4',
    nombre: 'Grupo 4 · Nororiental',
    proyecto: 'beta_1_nororiental',
    // Este grupo usa rutas en singular
    rutas: {
      empresas: '/api/empresa',
      categorias: '/api/categoria',
      prioridades: '/api/prioridad',
      retos: '/api/reto',
      registros: '/api/registro',
    },
    campos: {
      empresas: camposEmpresa('activo'),
      categorias: categoriaSimple,
      prioridades: prioridadConNivel,
      retos: retoBasico('fecha_inicio', 'fecha_fin', 'fechaHora'),
      registros: registroObservacion('fecha_registro'),
    },
  },
  {
    id: '5',
    nombre: 'Grupo 5 · Proyecto',
    proyecto: 'beta_1_proyecto',
    rutas: RUTAS_PLURAL,
    campos: {
      empresas: camposEmpresa(),
      categorias: categoriaSimple,
      prioridades: prioridadConNivel,
      retos: retoBasico('fechaInicio', 'fechaFin'),
      registros: registroTipo,
    },
  },
  {
    id: '420',
    nombre: 'Grupo 420 · Reto Empresarial',
    proyecto: 'beta1_RetoEmpresarial2',
    rutas: RUTAS_PLURAL,
    campos: {
      empresas: camposEmpresa(),
      categorias: categoriaSimple,
      prioridades: prioridadConNivel,
      retos: retoBasico('fechaInicio', 'fechaFin'),
      registros: registroObservacion('fechaRegistro'),
    },
  },
  {
    id: '800000',
    nombre: 'Grupo 800000 · InnovaCesde',
    proyecto: 'beta_1_InnovaCesde',
    rutas: RUTAS_PLURAL,
    campos: {
      empresas: camposEmpresa(),
      categorias: categoriaSimple,
      prioridades: [
        { nombre: 'nombre', etiqueta: 'Nombre', tipo: 'texto', requerido: true, max: 50, placeholder: 'Ej: Alta' },
        { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textoLargo', max: 200 },
      ],
      // Este grupo usa "titulo" en vez de "nombre" y fechas con hora
      retos: [
        { nombre: 'titulo', etiqueta: 'Título del reto', tipo: 'texto', requerido: true, max: 100 },
        { nombre: 'descripcion', etiqueta: 'Descripción', tipo: 'textoLargo', requerido: true, max: 200 },
        { nombre: 'fecha_creacion', etiqueta: 'Fecha de creación', tipo: 'fechaHora', requerido: true },
        { nombre: 'fecha_limite', etiqueta: 'Fecha límite', tipo: 'fechaHora', requerido: true },
        { nombre: 'estado', etiqueta: 'Estado', tipo: 'seleccion', opciones: ESTADOS_RETO, requerido: true },
      ],
      registros: registroTipo,
    },
  },
];

export const GRUPO_POR_DEFECTO = GRUPOS[0];

export const buscarGrupo = (id) => GRUPOS.find((g) => g.id === id) ?? GRUPO_POR_DEFECTO;
