# beta_1_Bizti — Grupo 2

API REST en Spring Boot para gestionar **empresas, categorías, prioridades, retos y registros**.

## Datos de la entrega

| Campo | Valor |
|---|---|
| Número de grupo | **2** |
| Jornada | Sábado |
| Enviado por | Leandro Rodríguez (GitHub: `leandroalbrodriguez`) |
| Fecha de envío | 23/10/2026 8:03:43 |
| Repositorio original | https://github.com/leandroalbrodriguez/beta_1_Bizti |

### Colaboradores

- Leandro Rodríguez (`leandroalbrodriguez`)
- José Manuel Sierra (`Josesierra2`)
- Marlon Graciano
- Mateo Cardona Parra
- Dannie (`d4anni.e`)
- Daniel Yepes (`DanielZen911`)
- Carlos Coronel (`XxCarlos741xX`)

> Los colaboradores se tomaron del historial de commits del repositorio.

## Tecnologías

- Java 17 (funciona con JDK 17 o superior)
- Spring Boot 4.1.1: Web MVC, Data JPA y DevTools
- Base de datos H2 en memoria
- Maven Wrapper (`mvnw`), no hace falta instalar Maven

## Cómo ejecutarlo

```bash
cd beta_1_Bizti
./mvnw spring-boot:run          # Windows CMD / PowerShell: mvnw spring-boot:run
```

- API: <http://localhost:8080>
- Consola H2: <http://localhost:8080/h2-console> (JDBC URL: la de `application.properties`, usuario `sa`, sin contraseña)

Para compilar y correr las pruebas:

```bash
cd beta_1_Bizti
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
  "fechaRegistros": "2026-01-01T10:00:00",
  "observacion": "o",
  "estado": "nuevo"
}
```

## Correcciones realizadas

1. `Registro`: usaba una clase `Usuario` que no existe en el proyecto (error de compilación); se eliminó esa relación. La relación con `Reto` usa `@JsonIgnore`.
2. `PrioridadControlador`: tenía una clase `CategoriaControlador` anidada por error, recibía `Categoria` en lugar de `Prioridad` y llamaba a métodos inexistentes (`Modificar`, `buscarPrioridadPorId()` sin id). Se reescribió.
3. `ServiciosPrioridad`: se agregó el método `modificarPrioridad`, que no existía.
4. Todos los controladores: rutas `"{/id}"` → `"/{id}"` y se agregó el `@GetMapping` que faltaba en `buscar`.
5. `Reto`: el nombre de la referencia JSON `"empresa_reto"` no coincidía con el de `Empresa` (`"reto_empresa"`), lo que causaba error 500 al listar empresas. Las columnas `"fecha inicio"` y `"fecha fin"` tenían espacios e impedían crear la tabla; ahora son `fecha_inicio` y `fecha_fin`.
6. `Categoria`: usaba `@JsonBackReference` sobre una lista (no permitido); se cambió a `@JsonManagedReference("reto_categoria")`.
7. `Empresa`: `sector` y `contacto` eran únicos, lo que impedía registrar dos empresas del mismo sector; ahora el campo único es `nit`. `contacto` pasó de 10 a 100 caracteres.
8. Los servicios `modificar` de Empresa, Reto y Registro ahora actualizan todos los campos.
9. Se quitó un import sin uso (`UserConfigurations`) y se corrigieron mensajes de error que decían "Usuario".
10. `application.properties`: se agregó la configuración de H2 y de la consola web.
11. Esta entrega incluye solo el backend.
12. **CORS habilitado:** se agregó `config/CorsConfig.java` para que un frontend (por ejemplo React en `http://localhost:5173`) pueda consumir la API desde el navegador. Permite `GET`, `POST`, `PUT`, `DELETE` y `OPTIONS` desde cualquier puerto de `localhost`.

## Verificación

- `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
- Con la aplicación en ejecución se probó el CRUD de los 5 recursos (POST → GET → PUT → DELETE → GET) y todas las operaciones respondieron correctamente.
- Se verificó CORS: la consulta previa (preflight) desde `http://localhost:5173` responde 200 con `Access-Control-Allow-Origin`.
- Se puede probar visualmente con el frontend [`frontend-pruebas-api`](../frontend-pruebas-api/).
