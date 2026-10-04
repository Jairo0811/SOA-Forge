# SOAForge Gateway

API Gateway académico para NovaCommerce, implementado con **ASP.NET Core 10 + YARP 2.3.0**.

## Capacidades

- routing centralizado hacia Customer, Order y Payment;
- rutas versionadas bajo `/api/v1/*`;
- autenticación Bearer con JWT;
- autorización central mediante la policy `gateway`;
- rate limiting de 60 solicitudes/minuto para tráfico proxied;
- health agregado de los tres servicios;
- catálogo de servicios;
- correlation ID y trace ID;
- logging estructurado de método, ruta, código HTTP, duración y usuario;
- métricas básicas del gateway.

## Puerto

`http://localhost:5100`

## Token de demo

`POST /auth/token`

El usuario incluido en `appsettings.json` existe solamente para la demostración académica local. El signing key y las credenciales deben sustituirse mediante configuración segura antes de cualquier despliegue real.

## Rutas

| Gateway | Upstream |
|---|---|
| `/api/v1/customers/*` | CustomerService `/api/customers/*` |
| `/api/v1/orders/*` | OrderService `/api/orders/*` |
| `/api/v1/payments/*` | PaymentService `/api/payments/*` |

## Observabilidad

- `GET /health`
- `GET /health/services`
- `GET /observability/metrics`
- headers `X-Correlation-ID` y `X-Trace-ID`
