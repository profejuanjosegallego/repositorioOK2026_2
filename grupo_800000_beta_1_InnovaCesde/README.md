# beta_1_InnovaCesde — Grupo 800000

API REST en Spring Boot para gestionar **empresas, categorías, prioridades, retos y registros**.

## Datos de la entrega

| Campo | Valor |
|---|---|
| Número de grupo | **800000** |
| Jornada | Sábado |
| Enviado por | Juan Andrés Gallego Pineda (GitHub: `juanandresgallegopineda7-droid`) |
| Fecha de envío | 23/10/2026 8:21:53 |
| Repositorio original | https://github.com/juanandresgallegopineda7-droid/beta_1_InnovaCesde |

### Colaboradores

- Juan Andrés Gallego Pineda (`juangallego12`)
- Julián Montenegro
- Mateo Pareja
- Jefry López
- Yohan Torres
- Deerly (`DeerlyM05`)

> Los colaboradores se tomaron del historial de commits del repositorio.

## Tecnologías

- Java 17 (funciona con JDK 17 o superior)
- Spring Boot 4.1.1: Web MVC, Data JPA y DevTools
- Base de datos H2 en memoria
- Maven Wrapper (`mvnw`), no hace falta instalar Maven

## Cómo ejecutarlo

```bash
cd beta_1_InnovaCesde
./mvnw spring-boot:run          # Windows CMD / PowerShell: mvnw spring-boot:run
```

- API: <http://localhost:8080>
- Consola H2: <http://localhost:8080/h2-console> (JDBC URL: la de `application.properties`, usuario `sa`, sin contraseña)

Para compilar y correr las pruebas:

```bash
cd beta_1_InnovaCesde
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
  "descripcion": "urgente"
}
```

**/api/retos**

```json
{
  "titulo": "R1",
  "descripcion": "d",
  "fecha_creacion": "2026-01-01T08:00:00",
  "fecha_limite": "2026-02-01T08:00:00",
  "estado": "abierto"
}
```

**/api/registros**

```json
{
  "tipo": "avance",
  "descripcion": "o",
  "fecha": "2026-01-01T10:00:00"
}
```

## Correcciones realizadas

1. `Reto`: faltaban los imports de `@ManyToOne`, `@JoinColumn` y `@JsonBackReference`, y el campo `empresa` estaba declarado dos veces (como `String` y como `Empresa`). Se dejó la relación y se agregaron getters y setters para empresa, categoría, prioridad y registros.
2. `Registro`: usaba una clase `Usuario` que no existe; se eliminó. La relación con `Reto` usa `@JsonIgnore` y su llave foránea ya no es obligatoria.
3. Referencias JSON: `Categoria` (`"categoria_reto"`) y `Prioridad` (`"prioridad_reto"`) no coincidían con las de `Reto`, y `Empresa` no tenía su lado de la relación. Se alinearon los nombres y se agregó `Empresa.retos`.
4. Controladores Empresa, Prioridad y Reto: rutas `"{/id}"` → `"/{id}"`, se agregó el `@GetMapping` faltante y `@RequestBody` en `modificar` de Reto.
5. `Empresa.contacto` ya no es único y pasó de 10 a 100 caracteres.
6. Servicios: `ServicioRegistro.modificar` no actualizaba ningún campo (solo tenía comentarios); los `modificar` de Empresa, Categoría, Prioridad y Reto ahora actualizan todos los campos.
7. `application.properties`: se agregó la configuración de H2 y de la consola web.

## Verificación

- `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
- Con la aplicación en ejecución se probó el CRUD de los 5 recursos (POST → GET → PUT → DELETE → GET) y todas las operaciones respondieron correctamente.
