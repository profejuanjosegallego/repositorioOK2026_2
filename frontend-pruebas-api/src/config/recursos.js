// =============================================================================
// METADATOS DE LOS RECURSOS
// -----------------------------------------------------------------------------
// Información visual de cada recurso: título, descripción, imagen e ícono.
// Las imágenes se cargan en línea desde Unsplash (fotos de uso libre).
// =============================================================================

const unsplash = (id, ancho = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${ancho}&q=75`;

export const IMAGEN_BANNER = unsplash('1522071820081-009f0129c71c', 1920);
export const IMAGEN_APRENDE = unsplash('1517245386807-bb43f82c33c4', 1200);

export const RECURSOS = [
  {
    clave: 'empresas',
    titulo: 'Empresas',
    singular: 'empresa',
    conArticulo: 'la empresa',
    ruta: '/empresas',
    icono: 'empresa',
    descripcion: 'Organizaciones aliadas que proponen los retos.',
    imagen: unsplash('1504384308090-c894fdcc538d'),
  },
  {
    clave: 'categorias',
    titulo: 'Categorías',
    singular: 'categoría',
    conArticulo: 'la categoría',
    ruta: '/categorias',
    icono: 'categoria',
    descripcion: 'Clasificación temática de los retos.',
    imagen: unsplash('1454165804606-c3d57bc86b40'),
  },
  {
    clave: 'prioridades',
    titulo: 'Prioridades',
    singular: 'prioridad',
    conArticulo: 'la prioridad',
    ruta: '/prioridades',
    icono: 'prioridad',
    descripcion: 'Niveles de urgencia para atender cada reto.',
    imagen: unsplash('1460925895917-afdab827c52f'),
  },
  {
    clave: 'retos',
    titulo: 'Retos',
    singular: 'reto',
    conArticulo: 'el reto',
    ruta: '/retos',
    icono: 'reto',
    descripcion: 'Desafíos empresariales con fechas y estado.',
    imagen: unsplash('1552664730-d307ca884978'),
  },
  {
    clave: 'registros',
    titulo: 'Registros',
    singular: 'registro',
    conArticulo: 'el registro',
    ruta: '/registros',
    icono: 'registro',
    descripcion: 'Seguimiento y bitácora del avance de los retos.',
    imagen: unsplash('1531482615713-2afd69097998'),
  },
];

export const buscarRecurso = (clave) => RECURSOS.find((r) => r.clave === clave);
