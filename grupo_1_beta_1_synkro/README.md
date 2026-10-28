# beta_1_synkro — Grupo 1

API REST en Spring Boot para gestionar **empresas, categorías, prioridades, retos y registros**.

## Datos de la entrega

| Campo | Valor |
|---|---|
| Número de grupo | **1** |
| Jornada | Sábado |
| Enviado por | María Paulina Cuartas (GitHub: `mpaulinacuartasc`) |
| Fecha de envío | 23/10/2026 8:09:52 |
| Repositorio original | https://github.com/mpaulinacuartasc/beta_1_synkro |

### Colaboradores

- María Paulina Cuartas
- Keith Sarin (`keithsarin`)
- Karina Arboleda
- Melany
- Luisa Castañeda

> Los colaboradores se tomaron del historial de commits del repositorio.

## Tecnologías

- Java 17 (funciona con JDK 17 o superior)
- Spring Boot 4.1.1: Web MVC, Data JPA y DevTools
- Base de datos H2 en memoria
- Maven Wrapper (`mvnw`), no hace falta instalar Maven

## Cómo ejecutarlo

```bash
./mvnw spring-boot:run          # Windows CMD / PowerShell: mvnw spring-boot:run
```

- API: <http://localhost:8080>
- Consola H2: <http://localhost:8080/h2-console> (JDBC URL: la de `application.properties`, usuario `sa`, sin contraseña)

Para compilar y correr las pruebas:

```bash
./mvnw package
```

## Endpoints

| Recurso | GET (listar) / POST (crear) | PUT (modificar) | DELETE (eliminar) |
|---|---|---|---|
| `/api/empresas` | `/api/empresas` | `/api/empresas/{id}` | `/api/empresas/{id}` |
| `/api/categorias` | `/api/categorias` | `/api/categorias/{id}` | `/api/categorias/{id}` |
| `/api/prioridades` | `/api/prioridades` | `/api/prioridades/{id}` | `/api/prioridades/{id}` |
| `/api/retos` | `/api/retos` | `/api/retos/{id}` | `/api/retos/{id}` |
| `/api/registros` | `/api/registros` | `/api/registros/{id}` | `/api/registros/{id}` |

Los `id` son UUID que genera la base de datos.

### Ejemplos de JSON para crear (POST)

**/api/empresas**

```json
{
  "nombre": "Acme",
  "nit": "900-1",
  "sector": "TI",
  "contacto": "Ana",
  "correo": "a@acme.co",
  "telefono": "3001",
  "activa": true
}
```

**/api/categorias**

```json
{
  "nombre": "Tec",
  "categoria": "Tecnologia",
  "descripcion": "d1"
}
```

**/api/prioridades**

```json
{
  "nombre": "Alta",
  "nivel": 1
}
```

**/api/retos**

```json
{
  "nombre": "R1",
  "descripcion": "d",
  "fecha_inicio": "2026-01-01",
  "fecha_fin": "2026-02-01",
  "estado": "abierto"
}
```

**/api/registros**

```json
{
  "fechaRegistro": "2026-01-01T10:00:00",
  "observacion": "o",
  "estado": "nuevo"
}
```

## Correcciones realizadas

1. `RegistroControlador`: anotaciones mal escritas (`@postMapping`, `@pustMapping`, `@deleteMapping`, `@pathVariable`, `HttpStatus.ok`), imports faltantes, rutas `"{/id}"` → `"/{id}"` y llamada a un método inexistente (`servicio.guardar` → `servicio.guardarRegistro`). Ruta normalizada a `/api/registros`.
2. `EmpresaControlador` y `PrioridadControlador`: faltaban `@GetMapping` y `@DeleteMapping`; la ruta `"/id"` se corrigió a `"/{id}"`; se quitaron imports sin uso.
3. `ServicioReto`: solo tenía `guardar`; se implementaron `buscar`, `modificar` y `eliminar`, que el controlador ya usaba.
4. `ServicioEmpresa.modificar`: ahora actualiza todos los campos (antes solo nombre y contacto).
5. **CORS habilitado:** se agregó `config/CorsConfig.java` para que un frontend (por ejemplo React en `http://localhost:5173`) pueda consumir la API desde el navegador. Permite `GET`, `POST`, `PUT`, `DELETE` y `OPTIONS` desde cualquier puerto de `localhost`.

## Verificación

- `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
- Con la aplicación en ejecución se probó el CRUD de los 5 recursos (POST → GET → PUT → DELETE → GET) y todas las operaciones respondieron correctamente.
- Se verificó CORS: la consulta previa (preflight) desde `http://localhost:5173` responde 200 con `Access-Control-Allow-Origin`.
- Se puede probar visualmente con el frontend [`frontend-pruebas-api`](../frontend-pruebas-api/).
