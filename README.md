# Revisión y corrección de proyectos backend — Jornada Sábado

Este repositorio reúne **6 proyectos backend** (Spring Boot + JPA + H2), uno por grupo. Todos implementan el mismo dominio: **empresas, categorías, prioridades, retos y registros**.

Cada proyecto se revisó y se corrigió hasta quedar **funcional**: compila, arranca, responde correctamente a las operaciones CRUD de sus 5 recursos y tiene **CORS habilitado**. Cada carpeta tiene su propio `README.md` con los datos del grupo, cómo ejecutarlo, los endpoints y la lista detallada de correcciones.

Incluye también un **frontend en React** ([`frontend-pruebas-api/`](frontend-pruebas-api/)) que sirve para probar cualquiera de las 6 APIs y como guía para que cada grupo construya su propio front.

## Índice de proyectos

| Grupo | Proyecto | Enviado por | Fecha de envío | Carpeta del código | README |
|:---:|---|---|---|---|---|
| 1 | beta_1_synkro | María Paulina Cuartas (`mpaulinacuartasc`) | 23/10/2026 8:09 | [`grupo_1_beta_1_synkro/`](grupo_1_beta_1_synkro/) | [Ver](grupo_1_beta_1_synkro/README.md) |
| 2 | beta_1_Bizti | Leandro Rodríguez (`leandroalbrodriguez`) | 23/10/2026 8:03 | [`grupo_2_beta_1_Bizti/beta_1_Bizti/`](grupo_2_beta_1_Bizti/beta_1_Bizti/) | [Ver](grupo_2_beta_1_Bizti/README.md) |
| 4 | beta_1_nororiental | Bry (`blyansviten-lang`) | 28/10/2026 8:48 | [`grupo_4_beta_1_nororiental/`](grupo_4_beta_1_nororiental/) | [Ver](grupo_4_beta_1_nororiental/README.md) |
| 5 | beta_1_proyecto | Juan Diego Posso Hidalgo (`Juan-0207`) | 23/10/2026 9:47 | [`grupo_5_beta_1_proyecto/`](grupo_5_beta_1_proyecto/) | [Ver](grupo_5_beta_1_proyecto/README.md) |
| 420 | beta1_RetoEmpresarial2 | Juan Pablo Cardona Vasco (`juanpablocardonavasco-debug`) | 23/10/2026 8:06 | [`grupo_420_beta1_RetoEmpresarial2/`](grupo_420_beta1_RetoEmpresarial2/) | [Ver](grupo_420_beta1_RetoEmpresarial2/README.md) |
| 800000 | beta_1_InnovaCesde | Juan Andrés Gallego Pineda (`juanandresgallegopineda7-droid`) | 23/10/2026 8:21 | [`grupo_800000_beta_1_InnovaCesde/beta_1_InnovaCesde/`](grupo_800000_beta_1_InnovaCesde/beta_1_InnovaCesde/) | [Ver](grupo_800000_beta_1_InnovaCesde/README.md) |

## Colaboradores por grupo

| Grupo | Colaboradores |
|:---:|---|
| 1 | María Paulina Cuartas, Keith Sarin, Karina Arboleda, Melany, Luisa Castañeda |
| 2 | Leandro Rodríguez, José Manuel Sierra, Marlon Graciano, Mateo Cardona Parra, Dannie, Daniel Yepes, Carlos Coronel |
| 4 | Bry, Johordan David Mendoza Flórez, Kevin Elian Posada Henao, Alejo Salazar |
| 5 | Juan Diego Posso Hidalgo |
| 420 | Juan Pablo Cardona Vasco, Matías Restrepo, Juan José Múnera Valencia, Alejandro |
| 800000 | Juan Andrés Gallego Pineda, Julián Montenegro, Mateo Pareja, Jefry López, Yohan Torres, Deerly |

> Los colaboradores se tomaron del historial de commits de cada repositorio original.

## Repositorios originales

| Grupo | Repositorio |
|:---:|---|
| 1 | https://github.com/mpaulinacuartasc/beta_1_synkro |
| 2 | https://github.com/leandroalbrodriguez/beta_1_Bizti |
| 4 | https://github.com/blyansviten-lang/beta_1_nororiental |
| 5 | https://github.com/Juan-0207/beta_1_proyecto (rama `develop`, archivo `.zip`) |
| 420 | https://github.com/juanpablocardonavasco-debug/beta1_RetoEmpresarial2 (rama `develop`) |
| 800000 | https://github.com/juanandresgallegopineda7-droid/beta_1_InnovaCesde |

## Rutas base de la API por proyecto

| Grupo | Empresas | Categorías | Prioridades | Retos | Registros |
|:---:|---|---|---|---|---|
| 1 | `/api/empresas` | `/api/categorias` | `/api/prioridades` | `/api/retos` | `/api/registros` |
| 2 | `/api/empresas` | `/api/categorias` | `/api/prioridades` | `/api/retos` | `/api/registros` |
| 4 | `/api/empresa` | `/api/categoria` | `/api/prioridad` | `/api/reto` | `/api/registro` |
| 5 | `/api/empresas` | `/api/categorias` | `/api/prioridades` | `/api/retos` | `/api/registros` |
| 420 | `/api/empresas` | `/api/categorias` | `/api/prioridades` | `/api/retos` | `/api/registros` |
| 800000 | `/api/empresas` | `/api/categorias` | `/api/prioridades` | `/api/retos` | `/api/registros` |

Cada recurso expone `GET` y `POST` sobre la ruta base, y `PUT` y `DELETE` sobre `ruta/{id}` (el `id` es un UUID).

## Estructura del repositorio

```
.
├── README.md                              ← este archivo
├── grupo_1_beta_1_synkro/                 ← proyecto Maven
├── grupo_2_beta_1_Bizti/
│   └── beta_1_Bizti/                      ← proyecto Maven (subcarpeta)
├── grupo_4_beta_1_nororiental/            ← proyecto Maven
├── grupo_5_beta_1_proyecto/               ← proyecto Maven
├── grupo_420_beta1_RetoEmpresarial2/      ← proyecto Maven
├── grupo_800000_beta_1_InnovaCesde/
│   └── beta_1_InnovaCesde/                ← proyecto Maven (subcarpeta)
└── frontend-pruebas-api/                  ← frontend React para probar las 6 APIs
```

En los grupos **2** y **800000** el proyecto Maven está en una subcarpeta, igual que en sus repositorios originales.

## Requisitos y ejecución

- **JDK 17 o superior** (no hace falta instalar Maven: cada proyecto trae `mvnw`).
- Base de datos **H2 en memoria**: no requiere instalación y se reinicia en cada arranque.

Para ejecutar cualquier proyecto, entra a la carpeta que contiene su `pom.xml` y ejecuta:

```bash
./mvnw spring-boot:run      # Windows: mvnw spring-boot:run
```

- API: <http://localhost:8080>
- Consola H2: <http://localhost:8080/h2-console> (usuario `sa`, sin contraseña)

Todos usan el puerto 8080, así que se ejecutan de a uno. Para correr varios a la vez, cambia el puerto:

```bash
./mvnw spring-boot:run -Dspring-boot.run.arguments=--server.port=8081
```

## Frontend de pruebas (React)

La carpeta [`frontend-pruebas-api/`](frontend-pruebas-api/) contiene una aplicación **React + Vite** que consume cualquiera de las 6 APIs:

- Selector de grupo y de URL del backend: se adapta a las rutas y campos de cada grupo.
- CRUD completo con formularios validados, tabla con buscador, ventanas modales y notificaciones.
- Diseño moderno con banner, imágenes en línea y animaciones.
- Código separado en `services/` (consumo con `fetch`), `components/commons/` y `pages/`, con comentarios en español.

```bash
# Terminal 1: un backend
cd grupo_1_beta_1_synkro && ./mvnw spring-boot:run

# Terminal 2: el frontend
cd frontend-pruebas-api && npm install && npm run dev
```

Abrir <http://localhost:5173> y elegir el grupo en la barra superior. Más detalles en su [README](frontend-pruebas-api/README.md).

## CORS

Los 6 backends incluyen `config/CorsConfig.java`, que permite peticiones desde cualquier puerto de `localhost` (por ejemplo `http://localhost:5173`) en las rutas `/api/**` con los métodos `GET`, `POST`, `PUT`, `DELETE` y `OPTIONS`.

## Tecnologías comunes

| Tecnología | Versión |
|---|---|
| Java | 17 |
| Spring Boot | 4.1.1 (Web MVC, Data JPA, DevTools) |
| Base de datos | H2 en memoria |
| Build | Maven Wrapper |
| Frontend | React 18 + Vite 5 + React Router 6 |

## Verificación realizada

En los 6 proyectos:

1. `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
2. Con la aplicación en ejecución se probó, en cada uno de sus 5 recursos, la secuencia **POST → GET → PUT → DELETE → GET**. Todas las operaciones respondieron correctamente.
3. Se verificó CORS: la consulta previa (preflight) desde `http://localhost:5173` responde 200 con `Access-Control-Allow-Origin`.
4. El frontend compila (`npm run build`) y se probó en Chrome contra el backend del grupo 1: crear, editar y eliminar empresas, crear retos con fechas y el cambio de grupo.
