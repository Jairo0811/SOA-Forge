# SOAForge — Gateway and Governance Policies

## Alcance

Estas políticas pertenecen a la demo académica de **ISO-810 / Akana SOA**. No representan configuración real de Akana; implementan conceptos equivalentes para explicar gobierno de servicios y APIs.

## 1. Gateway-mediated access

El acceso externo a las APIs de NovaCommerce debe realizarse mediante `SOAForge.Gateway` en el puerto `5100`.

Las rutas públicas versionadas son:

- `/api/v1/customers/*`
- `/api/v1/orders/*`
- `/api/v1/payments/*`

Los puertos `5101`, `5102` y `5103` corresponden a los upstreams de la demo y no constituyen el contrato externo recomendado.

## 2. Authentication

Las rutas proxied requieren un **JWT Bearer** válido emitido por el token endpoint académico del Gateway.

- Issuer: `SOAForge.Gateway`
- Audience: `SOAForge.NovaCommerce`
- Lifetime local por defecto: 60 minutos

La clave incluida en el repositorio es exclusivamente de desarrollo. Un despliegue real debe utilizar secret storage y rotación de claves.

## 3. Authorization

La policy `gateway` exige usuario autenticado antes de permitir acceso a los clusters internos. La demo utiliza un rol `operator` como base para futuras reglas por capacidad.

## 4. Rate limiting

El tráfico proxied está limitado a **60 solicitudes por minuto**. Una solicitud que exceda el límite recibe HTTP `429 Too Many Requests`.

El valor es una política académica inicial, no un sizing de producción.

## 5. Versioning

El contrato externo incluye la versión en la URI (`/api/v1/...`). La versión interna de cada servicio permanece desacoplada de esa decisión de borde.

## 6. Audit and traceability

Cada solicitud procesada por el gateway registra de forma estructurada:

- método HTTP;
- ruta;
- status code;
- duración;
- usuario autenticado o `anonymous`;
- `X-Correlation-ID`;
- `X-Trace-ID`.

Si el consumidor no envía `X-Correlation-ID`, el Gateway genera uno y lo propaga al upstream.

## 7. Health and service catalog

Endpoints públicos de control:

- `/catalog`
- `/health`
- `/health/services`
- `/observability/metrics`

Estos endpoints permiten demostrar discovery/catalog, estado operativo y observabilidad sin exponer la lógica interna de las APIs protegidas.
