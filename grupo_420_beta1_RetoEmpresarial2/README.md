# beta1_RetoEmpresarial2 — Grupo 420

API REST en Spring Boot para gestionar **empresas, categorías, prioridades, retos y registros**.

## Datos de la entrega

| Campo | Valor |
|---|---|
| Número de grupo | **420** |
| Jornada | Sábado |
| Enviado por | Juan Pablo Cardona Vasco (GitHub: `juanpablocardonavasco-debug`) |
| Fecha de envío | 23/10/2026 8:06:43 |
| Repositorio original | https://github.com/juanpablocardonavasco-debug/beta1_RetoEmpresarial2 (rama `develop`) |

### Colaboradores

- Juan Pablo Cardona Vasco
- Matías Restrepo (`Mattsito89`)
- Juan José Múnera Valencia
- Alejandro (`alejandrochika233-hash`)

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
  "fechaInicio": "2026-01-01",
  "fechaFin": "2026-02-01",
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

1. Los controladores estaban en una carpeta `controllers/` en la raíz, fuera de `src/main/java`, así que Maven no los compilaba. Se movieron a `src/main/java/.../controllers` y se reescribieron: tenían paquetes incorrectos (`models.controllers`), variables inexistentes (`servicio`), `@DelateMapping`, rutas `"{/id}"`, `@GetMapping` faltantes y métodos mal nombrados.
2. Rutas normalizadas a minúsculas y plural: `/api/empresas`, `/api/categorias`, `/api/prioridades`, `/api/registros`, `/api/retos` (antes `/api/Empresas`, `/api/categoria`, etc.).
3. `Reto` era una clase vacía; se implementó como entidad JPA con sus campos y sus relaciones con Empresa, Categoria, Prioridad y Registro.
4. Repositorios: eran interfaces sin `extends JpaRepository`, por lo que Spring no podía crearlos y la aplicación no arrancaba. Ahora extienden `JpaRepository<Entidad, UUID>`.
5. `Categoria`: se eliminaron `getNivel`/`setNivel`, que lanzaban `UnsupportedOperationException`, y se corrigió `setDescripcion(Object)` → `setDescripcion(String)`.
6. Referencias JSON: las `@JsonManagedReference` y `@JsonBackReference` sin nombre chocaban entre sí; ahora tienen nombres que coinciden en ambos lados.
7. `Registro`: la llave foránea a `Reto` ya no es obligatoria. Antes era imposible crear un registro, porque la relación no se recibe en el JSON.
8. Servicios: `servicioEmpresa` → `ServicioEmpresa` y `servicioReto` → `ServicioReto` (clase y archivo); `ServicioPrioridad` usa `IRepositoryPrioridad`; `ServicioReto.modificar` ya actualiza los campos; `eliminarPrioridad` de Reto → `eliminarReto`; se corrigieron mensajes de error copiados ("prioridad").
9. Se eliminaron las carpetas `target_classes/` y `target_test-classes/`, que contenían archivos compilados subidos al repositorio.
10. `application.properties`: se agregó la configuración de H2 y de la consola web.

## Verificación

- `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
- Con la aplicación en ejecución se probó el CRUD de los 5 recursos (POST → GET → PUT → DELETE → GET) y todas las operaciones respondieron correctamente.
