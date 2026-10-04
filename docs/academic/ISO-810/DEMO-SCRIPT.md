# SOAForge — Live Demo Script

## Objetivo de la demo

Demostrar que SOAForge no es solo un conjunto de CRUDs, sino un flujo de integración con Gateway, seguridad, políticas, observabilidad y trazabilidad.

## Preparación

Desde la raíz del repositorio, abrir cuatro terminales:

```bash
dotnet run --project src/Services/CustomerService
```

```bash
dotnet run --project src/Services/OrderService
```

```bash
dotnet run --project src/Services/PaymentService
```

```bash
dotnet run --project src/Gateway
```

Portal:

```bash
cd src/Portal
npm install
npm run dev
```

## Credenciales de demo

- Usuario: `demo`
- Contraseña: `SOAForge2026!`

## Flujo recomendado de presentación

### 1. Mostrar el Gateway

Abrir:

```text
http://localhost:5100
```

Mensaje a decir:

> Este Gateway representa la capa de mediación y gobierno. El consumidor no necesita conocer directamente cada servicio interno.

### 2. Mostrar catálogo

```text
http://localhost:5100/catalog
```

Mensaje:

> El catálogo expone capacidades, rutas externas, OpenAPI upstream y responsabilidad de cada servicio.

### 3. Mostrar health agregado

```text
http://localhost:5100/health/services
```

Mensaje:

> Esta vista ayuda a explicar gobierno operacional: no basta con que exista una API, también debe poder monitorearse.

### 4. Generar JWT

Usar `demo/NovaCommerce.http` o el portal para solicitar token:

```http
POST http://localhost:5100/auth/token
Content-Type: application/json

{
  "username": "demo",
  "password": "SOAForge2026!"
}
```

Mensaje:

> La seguridad se aplica en el borde. Antes de llegar a los servicios internos, el Gateway valida el token.

### 5. Consumir clientes vía Gateway

```http
GET http://localhost:5100/api/v1/customers
Authorization: Bearer {{token}}
```

Mensaje:

> La ruta pública versionada es del Gateway; los puertos internos quedan desacoplados.

### 6. Crear una orden

```http
POST http://localhost:5100/api/v1/orders
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "customerId": "11111111-1111-1111-1111-111111111111",
  "total": 1500
}
```

Mensaje:

> OrderService valida remotamente que el cliente exista. Esto demuestra integración service-to-service.

### 7. Crear pago

```http
POST http://localhost:5100/api/v1/payments
Authorization: Bearer {{token}}
Content-Type: application/json

{
  "orderId": "{{orderId}}",
  "amount": 1500
}
```

Mensaje:

> PaymentService valida la orden antes de aprobar el pago. Cada capacidad mantiene su frontera.

### 8. Mostrar métricas

```text
http://localhost:5100/observability/metrics
```

Mensaje:

> El Gateway registra solicitudes, fallos y duración promedio. Esto conecta la demo con observabilidad y gobierno.

## Cierre de demo

> SOAForge no reemplaza Akana. Es una maqueta funcional que permite defender los conceptos: gateway, gobierno de APIs, seguridad, políticas, catálogo, trazabilidad y operación.

## Plan B

Si una terminal falla, usar capturas del portal o `demo/NovaCommerce.http` y explicar el flujo apoyándose en los documentos:

- `docs/architecture/FINAL-ARCHITECTURE.md`
- `docs/governance/POLICIES.md`
- `docs/governance/AKANA-MAPPING.md`
