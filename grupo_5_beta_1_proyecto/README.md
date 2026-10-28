# beta_1_proyecto — Grupo 5

API REST en Spring Boot para gestionar **empresas, categorías, prioridades, retos y registros**.

## Datos de la entrega

| Campo | Valor |
|---|---|
| Número de grupo | **5** |
| Jornada | Sábado |
| Enviado por | Juan Diego Posso Hidalgo (GitHub: `Juan-0207`) |
| Fecha de envío | 23/10/2026 9:47:43 |
| Repositorio original | https://github.com/Juan-0207/beta_1_proyecto (rama `develop`, archivo `beta_1_proyecto#3.zip`) |

### Colaboradores

- Juan Diego Posso Hidalgo (`Juan-0207`)

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
  "tipo": "avance",
  "descripcion": "o",
  "fecha": "2026-01-01T10:00:00"
}
```

## Correcciones realizadas

1. El proyecto venía comprimido en un `.zip` dentro del repositorio; se extrajo y se entrega como código fuente.
2. `pom.xml`: pedía Java 25; se ajustó a Java 17, igual que los demás proyectos y compatible con JDK 17 o superior.
3. Controladores: recibían el `id` como `Long`, pero las entidades y servicios usan `UUID` (error de compilación). Se cambió a `UUID`.
4. `Registro`: usaba una clase `Usuario` que no existe; se eliminó.
5. Referencias JSON: `Empresa`, `Categoria`, `Prioridad` y `Reto` tenían `@JsonManagedReference` sin su `@JsonBackReference`, lo que daba error 500 al listar. Se agregaron en `Reto` y `Registro`.
6. Las llaves foráneas de `Reto` y `Registro` ya no son obligatorias. Antes no se podía crear ningún reto ni registro, porque las relaciones no se reciben en el JSON.
7. `ServicioReto.modificar` y `ServicioRegistro.modificar` ya no borran las relaciones al actualizar.
8. Se eliminaron las carpetas `target/` y `.github/`, que contenían archivos compilados y scripts de otra herramienta.
9. `application.properties`: se agregó la configuración de H2 y de la consola web.

## Verificación

- `./mvnw clean package` compila sin errores y pasa la prueba `contextLoads`, que levanta la aplicación completa con H2.
- Con la aplicación en ejecución se probó el CRUD de los 5 recursos (POST → GET → PUT → DELETE → GET) y todas las operaciones respondieron correctamente.
