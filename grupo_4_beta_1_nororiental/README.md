# beta_1_nororiental — Grupo 4

API REST en Spring Boot para gestionar **empresas, categorías, prioridades, retos y registros**.

## Datos de la entrega

| Campo | Valor |
|---|---|
| Número de grupo | **4** |
| Jornada | Sábado |
| Enviado por | Bry (GitHub: `blyansviten-lang`) |
| Fecha de envío | 28/10/2026 8:48:16 |
| Repositorio original | https://github.com/blyansviten-lang/beta_1_nororiental |

### Colaboradores

- Bry (`blyansviten-lang`)
- Johordan David Mendoza Flórez (`johordanmendoza`)
- Kevin Elian Posada Henao
- Alejo Salazar

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
| `/api/empresa` | `/api/empresa` | `/api/empresa/{id}` | `/api/empresa/{id}` |
| `/api/categoria` | `/api/categoria` | `/api/categoria/{id}` | `/api/categoria/{id}` |
| `/api/prioridad` | `/api/prioridad` | `/api/prioridad/{id}` | `/api/prioridad/{id}` |
| `/api/reto` | `/api/reto` | `/api/reto/{id}` | `/api/reto/{id}` |
| `/api/registro` | `/api/registro` | `/api/registro/{id}` | `/api/registro/{id}` |

Los `id` son UUID que genera la base de datos.

### Ejemplos de JSON para crear (POST)

**/api/empresa**

```json
{
  "nombre": "Acme",
  "nit": "900-1",
  "sector": "TI",
  "contacto": "Ana",
  "correo": "a@acme.co",
  "telefono": "3001",
  "activo": true
}
```

**/api/categoria**

```json
{
  "nombre": "Tec",
  "descripcion": "d1"
}
```

**/api/prioridad**

```json
{
  "nombre": "Alta",
  "nivel": 1
}
```

**/api/reto**

```json
{
  "nombre": "R1",
  "descripcion": "d",
  "fecha_inicio": "2026-01-01T08:00:00",
  "fecha_fin": "2026-02-01T08:00:00",
  "estado": "abierto"
}
```

**/api/registro**

```json
{
  "fecha_registro": "2026-01-01T10:00:00",
  "observacion": "o",
  "estado": "nuevo"
}
```

## Correcciones realizadas

1. La clase principal `Beta1NororientalApplication` estaba en el paquete `Service`, así que Spring solo escaneaba ese paquete y no encontraba controladores, repositorios ni entidades. Se movió al paquete raíz `com.example.beta_1_nororiental`.
2. `Categoria`: tenía `@OneToMany(mappedBy = "categoria")` hacia `Registro`, que no tiene ese campo, lo que hacía fallar el arranque de Hibernate. Se cambió por la relación correcta con `Reto` (`retos`).
3. Referencias JSON: `Reto` no tenía las `@JsonBackReference` que corresponden a Empresa, Categoría y Prioridad (error 500 al listar). Se agregaron con nombres coincidentes.
4. Se agregaron los getters y setters de las relaciones que faltaban en `Reto`, `Registro`, `Empresa` y `Categoria`.
5. Las llaves foráneas de `Reto` y `Registro` ya no son obligatorias. Antes no se podía crear ningún reto ni registro desde la API.
6. `Empresa`: `sector` y `contacto` eran únicos, lo que impedía registrar dos empresas del mismo sector; ahora el campo único es `nit`.
7. Servicios: los `modificar` ahora actualizan todos los campos; `ServicioCategoria` devolvía 400 en lugar de 404; se corrigió un mensaje de error copiado en `ServicioEmpresa`.
8. `application.properties`: se agregó la configuración de H2 y de la consola web.
9. Se mantienen las rutas en singular que definió el equipo (`/api/empresa`, `/api/reto`, etc.).

## Verificación

- `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
- Con la aplicación en ejecución se probó el CRUD de los 5 recursos (POST → GET → PUT → DELETE → GET) y todas las operaciones respondieron correctamente.
