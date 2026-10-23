## 1. Punto de partida y nombre de la copia.

Nombre de la copia: tp-07-salas-mongodb
Copia funcional y depurada del trabajo practico 06, conservando intacta la estructura previa de la aplicacion web en express y su logica de funcionamiento en memoria

## 2. Versiones utilizadas y confirmación del uso de Atlas Free (M0)

Node.js: v24.19.0
Mongoose: v9.11.2 (gestion de esquemas y conexion)
Express: v5.2.1 (servidor web y rutas)
Entorno de base de datos: Mongodb Atlas, cluster gratuito, utilizando una base de datos propia denominada `reservas_salas_u7`

## 3. Pasos desde una descarga nueva: instalar dependencias, preparar el clúster gratuito, usuario e IP permitida, copiar la plantilla de entorno y ejecutar.

1. Instalar dependencias: Ejecutar `npm install` en la raiz del proyecto para instalar los modulos necesarios
2. Preparar cluster gratuito en MongoDB Atlas:
    * Crear un cluster gratuito en Atlas Free
    * Configurar un usuario de base de datos con permisos de lectura y escritura
    * Agregar la ip permitida correspondiente en el panel de red
3. Configurar el entorno:
    * Tomar como referencia el archivo `.env.example` y crear una copia nombrada "env" en la raiz del proyecto
    * Reemplazar los marcadores de la variable `MONGODB_URI` con la URI provista por Atlas, especificando la base de datos
4. Ejecución de scripts y servidor:
    * Comprobar conexión: `node --env-file .env scripts/comprobar-conexion.js`
    * Crear una reserva: `node --env-file .env scripts/crear-reserva.js`
    * Listar reservas: `node --env-file .env scripts/listar-reservas.js`
    * Iniciar el sitio web en memoria: `npm start`

## 4. Diagnóstico DNS y resolutores usados, si hubo ajustes; comandos exactos de conexión, creación, listado, calidad y arranque web.

Diagnóstico DNS y resolutores usados: Para evitar bloqueos o fallos en la resolución de registros de MongoDB Atlas desde Node.js, se configuraron explícitamente los servidores DNS públicos autorizados (`8.8.8.8` y `1.1.1.1`) utilizando `dns.setServers(["8.8.8.8", "1.1.1.1"])` dentro de `src/config/base-datos.js` previo a la conexión

Comandos exactos de ejucucion:
Comprobar conexión: `node --env-file .env scripts/comprobar-conexion.js`
Crear reserva: `node --env-file .env scripts/crear-reserva.js`
Listar reservas: `node --env-file .env scripts/listar-reservas.js`
Control de calidad (Lint y Formato): `npm run check`
Arranque del sitio web: `npm start`

## 5. Mapa de archivos y explicación de esquema, modelo y colección

Mapa de archivos principales del laboratorio:
  * `src/config/entorno.js`: Gestión y lectura centralizada de variables de entorno (puerto, formato de registro y URI de MongoDB)
  * `src/config/base-datos.js`: Configuración de los servidores DNS (`8.8.8.8`, `1.1.1.1`) y función de conexión asíncrona mediante Mongoose
  * `src/modelos/reserva.js`: Definición del esquema y modelo Mongoose asociado explícitamente a la colección de la base de datos
  * `scripts/comprobar-conexion.js`: Programa de terminal para validar la conectividad con el clúster Atlas
  * `scripts/crear-reserva.js`: Programa de terminal para instanciar y guardar una reserva válida
  * `scripts/listar-reservas.js`: Programa de terminal para consultar el listado completo y la cantidad de documentos recuperados

Explicación de esquema, modelo y colección:
* Colección:** El modelo de Mongoose está vinculado de forma explícita a la colección `reservas`
* Esquema y Reglas Mínimas: 
* `estudiante`: Tipo `String`, obligatorio y sin espacios en los extremos (`trim`)
* `email`: Tipo `String`, obligatorio, con `trim` y validación de la presencia de `@` mediante expresión regular/match
* `sala`: Tipo `String`, obligatorio, restringido mediante `enum` a las opciones permitidas: *"Sala Norte"*, *"Sala Sur"* o *"Sala Multimedia"*
* `fecha`: Tipo `String`, obligatorio y no vacío
* `turno`: Tipo `String`, obligatorio, restringido mediante `enum` a: *"Mañana"*, *"Tarde"* o *"Noche"*
* `personas`: Tipo `Number`, obligatorio, validado con límites `min: 1`, `max: 6` y la condición de número entero mediante `Number.isInteger`

## 6. Campos y reglas, incluyendo límites que todavía no se controlan.

Campos y reglas mínimas del modelo:
* estudiante: Tipo `String`, obligatorio y sin espacios en los extremos (`trim`)
* email: Obligatorio, con `trim` y validación de la presencia de `@`
* sala: Obligatorio, limitado exclusivamente a las opciones *"Sala Norte"*, *"Sala Sur"* o *"Sala Multimedia"* mediante el uso de `enum`
* fecha: Tipo `String`, obligatorio y no vacío tras aplicar `trim`
* turno: Obligatorio, limitado mediante `enum` a *"Mañana"*, *"Tarde"* o *"Noche"*
* personas: Tipo `Number`, obligatorio, con límites establecidos entre 1 y 6 (`min` y `max`), validando además que sea un número entero mediante `Number.isInteger`

Límites y validaciones que todavía no se controlan:
* No se realiza una validación completa o avanzada del formato de correo electrónico
* No se controlan fechas imposibles ni se implementa una regla estricta de fecha futura
* No se gestionan solapamientos de horarios, cupos compartidos ni detección de reservas repetidas
* No se exige un índice único en la base de datos para este nivel del laboratorio

## 7. Matriz de pruebas con resultados y evidencia de persistencia entre procesos.

| Caso | Resultado observado | Cantidad antes → después |
|---|---|---:|
| Conexión válida | Conexión confirmada; proceso finalizado con código 0 | No aplica |
| Fallo DNS | No ocurrió durante las pruebas | No aplica |
| `MONGODB_URI` vacía | `MongoParseError: Invalid scheme`; sin éxito; código 1 | No aplica |
| Contraseña incorrecta | `MongoServerError`, código 8000 (`AtlasError`); sin éxito; código 1 | No aplica |
| Colección vacía | No probada; la colección ya tenía documentos | No aplica |
| Reserva válida | Guardada con `_id` `6acfc9604d9ce8c443dc2de2` | 2 → 3 |
| Consulta desde otro proceso | Recuperó el mismo `_id` | 3 → 3 |
| Segunda consulta | La cantidad se mantuvo igual | 3 → 3 |
| Estudiante vacío | Rechazado por validación | 4 → 4 |
| Email sin `@` | Rechazado por validación | 4 → 4 |
| Sala inválida | Rechazada por validación | 4 → 4 |
| Turno inválido | Rechazado por validación | 4 → 4 |
| Fecha vacía | Rechazada por validación | 4 → 4 |
| Personas `0` | Rechazado por validación | 4 → 4 |
| Personas `7` | Rechazado por validación | 4 → 4 |
| Personas `2.5` | Rechazado por validación | 4 → 4 |
| Personas con texto | Rechazado con `CastError` | 4 → 4 |

En el ensayo de persistencia, el listado inicial mostró 2 documentos. Después de crear la reserva con el `_id` indicado, un proceso nuevo la recuperó y la cantidad pasó a 3. Una segunda consulta mantuvo la cantidad en 3. La captura de Atlas muestra la base `reservas_salas_u7`, la colección `reservas` y ese mismo documento. Una creación válida posterior dejó la colección en 4 documentos.

## 8. Explicación de por qué el sitio continúa en memoria y qué se abordará en la unidad 8

El sitio web mantiene las reservas en memoria y los scripts de terminal usan MongoDB por separado. En la unidad 8 se prevé continuar con la integración de la base de datos en el servicio HTTP y el manejo asíncrono de las operaciones.

## 9. Confirmación de que no se publican .env, credenciales ni datos personales

El archivo .env, que contiene la URI privada de conexion, esta excluida de GIT mediante .gitignore. se versiona unicamente .env.example, con valores de ejemplo y sin credenciales, las reservas de prueba usan datos ficticios, no se incluyen datos personales reales