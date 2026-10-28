# RetoLab · Frontend de pruebas para las APIs

Aplicación **React + Vite** que sirve para probar cualquiera de las 6 APIs de este repositorio. Permite crear, listar, editar y eliminar **empresas, categorías, prioridades, retos y registros**.

Además de herramienta de pruebas, es una **guía de referencia**: el código está separado en capas y comentado en español para que cada grupo construya su propio frontend.

## Características

- Banner inicial con imagen en línea, degradados y animaciones de entrada.
- Selector de **grupo** y de **URL del backend**: un solo frontend sirve para las 6 APIs.
- Verificación en vivo de qué recursos responden.
- Formularios con validación (obligatorios, correo, teléfono, longitudes, números), mensajes de error por campo y contador de caracteres.
- Tabla con buscador, formato de fechas en español, insignias de estado y columna de acciones fija.
- Ventanas modales, diálogo de confirmación y notificaciones animadas.
- Animaciones al hacer scroll y estados de carga con esqueleto.
- Diseño adaptable a celular, tableta y escritorio. Respeta la preferencia de "reducir movimiento" del sistema.
- Tipografía **Plus Jakarta Sans** (textos) y **JetBrains Mono** (datos técnicos).
- Consumo de la API **solo con `fetch`**, sin librerías adicionales.

## Requisitos

- Node.js 18 o superior.
- Uno de los backends de este repositorio en ejecución. Todos tienen CORS habilitado para `localhost`.

## Cómo ejecutarlo

```bash
# 1. Encender un backend (en otra terminal), por ejemplo el del grupo 1
cd ../grupo_1_beta_1_synkro
./mvnw spring-boot:run

# 2. Encender el frontend
cd ../frontend-pruebas-api
npm install
npm run dev
```

Abrir <http://localhost:5173>. Luego, en la barra superior, elige el **grupo** cuyo backend encendiste y verifica la URL (por defecto `http://localhost:8080`).

Para cambiar la URL por defecto, copia `.env.example` como `.env` y edita `VITE_API_URL`.

## Estructura del proyecto

```
src/
├── services/              ← CAPA DE CONSUMO DE LA API (fetch)
│   ├── clienteHttp.js         función peticion(): URL base, fetch y manejo de errores
│   ├── empresasService.js     listar, crear, modificar, eliminar
│   ├── categoriasService.js
│   ├── prioridadesService.js
│   ├── retosService.js
│   └── registrosService.js
│
├── components/
│   └── commons/           ← COMPONENTES REUTILIZABLES
│       ├── Navbar.jsx, Footer.jsx, Banner.jsx, EncabezadoPagina.jsx
│       ├── Boton.jsx, Icono.jsx, Imagen.jsx, Aparecer.jsx
│       ├── Campo.jsx, Formulario.jsx          formularios y validación
│       ├── TablaDatos.jsx                     tabla con buscador
│       ├── Modal.jsx, DialogoConfirmacion.jsx
│       ├── Notificaciones.jsx, Cargando.jsx, EstadoVacio.jsx
│       ├── TarjetaRecurso.jsx, SelectorGrupo.jsx
│       └── GestorRecurso.jsx                  une todo para un CRUD completo
│
├── pages/                 ← PÁGINAS (una por ruta)
│   ├── InicioPage.jsx
│   ├── EmpresasPage.jsx, CategoriasPage.jsx, PrioridadesPage.jsx
│   ├── RetosPage.jsx, RegistrosPage.jsx
│   └── NoEncontradaPage.jsx
│
├── hooks/                 ← LÓGICA REUTILIZABLE
│   ├── useCrud.js             estado de datos + operaciones con la API
│   ├── useFormulario.js       valores, validación y conversión de datos
│   └── useAparecer.js         animación al hacer scroll
│
├── context/               ← ESTADO GLOBAL
│   ├── GrupoContext.jsx       grupo y URL seleccionados
│   └── NotificacionesContext.jsx
│
├── config/                ← CONFIGURACIÓN
│   ├── grupos.js              rutas y campos de cada una de las 6 APIs
│   └── recursos.js            títulos, íconos e imágenes de cada recurso
│
├── styles/
│   ├── global.css             variables de diseño, base y animaciones
│   └── componentes.css        estilos de cada componente
│
├── App.jsx                ← rutas y estructura general
└── main.jsx               ← punto de entrada
```

### Flujo de una petición

```
Página (EmpresasPage)
   └─ GestorRecurso ── usa ──> useCrud(empresasService)
                                   └─ empresasService.listar()
                                         └─ peticion('/api/empresas')   ← fetch
                                               └─ Backend Spring Boot
```

## Guía para construir tu propio frontend

Si tu frontend es solo para tu grupo, puedes simplificar bastante:

1. **Copia `services/clienteHttp.js`** y deja la URL fija:
   ```js
   const URL_BASE = 'http://localhost:8080';
   ```
2. **Escribe tus servicios** con las rutas reales de tu controlador:
   ```js
   export function listarEmpresas() {
     return peticion('/api/empresas');
   }

   export function crearEmpresa(datos) {
     return peticion('/api/empresas', { metodo: 'POST', cuerpo: datos });
   }
   ```
3. **Usa el servicio en una página** con `useState` y `useEffect`:
   ```jsx
   const [empresas, setEmpresas] = useState([]);

   useEffect(() => {
     listarEmpresas().then(setEmpresas).catch((e) => alert(e.message));
   }, []);
   ```
4. **Reutiliza los componentes** de `components/commons` (Boton, Campo, Modal, TablaDatos…) o crea los tuyos con la misma idea.
5. No necesitas `config/grupos.js` ni `GrupoContext`: esos archivos existen solo para que este frontend funcione con las 6 APIs a la vez.

### Tips sobre fetch

- `fetch` **no lanza error** con respuestas 404 o 500: hay que revisar `respuesta.ok`, como hace `clienteHttp.js`.
- Para enviar datos se usa `JSON.stringify(objeto)` y la cabecera `Content-Type: application/json`.
- Si el navegador muestra un error de **CORS**, el backend necesita la clase `CorsConfig` (ya incluida en los 6 proyectos).
- Las fechas `LocalDate` se envían como `"2026-01-31"` y las `LocalDateTime` como `"2026-01-31T08:30:00"`.

## Diferencias entre las APIs

Este frontend se adapta solo a cada grupo con lo que está definido en `src/config/grupos.js`:

| Grupo | Rutas | Diferencias principales |
|:---:|---|---|
| 1 | plural | Categoría tiene el campo extra `categoria`; Registro usa `fechaRegistro` |
| 2 | plural | Registro usa `fechaRegistros` |
| 4 | **singular** (`/api/empresa`…) | Empresa usa `activo`; fechas de Reto con hora; Registro usa `fecha_registro` |
| 5 | plural | Reto usa `fechaInicio` y `fechaFin`; Registro usa `tipo`, `descripcion` y `fecha` |
| 420 | plural | Reto usa `fechaInicio` y `fechaFin` |
| 800000 | plural | Prioridad usa `descripcion`; Reto usa `titulo`, `fecha_creacion` y `fecha_limite`; Registro usa `tipo`, `descripcion` y `fecha` |

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo en <http://localhost:5173> |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción para revisarla |

Las imágenes son de [Unsplash](https://unsplash.com) y se cargan en línea. Si alguna falla, el componente `Imagen` usa una imagen de respaldo.
