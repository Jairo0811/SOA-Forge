# Phase 2 — Core Services Demo

## Objetivo

Implementar el núcleo programado de **NovaCommerce** con tres APIs independientes en ASP.NET Core, contratos HTTP/OpenAPI y comunicación service-to-service.

## Servicios

| Servicio | Puerto local | Responsabilidad |
|---|---:|---|
| CustomerService | 5101 | Clientes y consulta de identidad comercial |
| OrderService | 5102 | Órdenes y validación del cliente |
| PaymentService | 5103 | Pagos y validación de la orden |

## Flujo de integración

```text
Client
  |
  +--> CustomerService : POST /api/customers
  |
  +--> OrderService : POST /api/orders
  |        |
  |        +--> CustomerService : GET /api/customers/{customerId}
  |
  +--> PaymentService : POST /api/payments
           |
           +--> OrderService : GET /api/orders/{orderId}
```

La validación entre servicios demuestra el principio SOA de consumir una capacidad a través de un contrato remoto en vez de acceder directamente a la implementación o almacenamiento de otro servicio.

## OpenAPI

Cada API registra `AddOpenApi()` y publica el documento mediante `MapOpenApi()`. En ejecución local, el documento queda disponible en la ruta estándar de ASP.NET Core OpenAPI.

## Persistencia en esta fase

La Fase 2 utiliza repositorios **in-memory** intencionalmente. El objetivo es validar contratos, separación de responsabilidades e integración antes de introducir infraestructura persistente adicional.

## Próxima capa

La Fase 3 colocará un **API Gateway** delante de estos servicios para centralizar routing y políticas, aproximando los conceptos estudiados en Akana.
