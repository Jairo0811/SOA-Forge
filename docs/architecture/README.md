# Architecture

SOAForge adopta una arquitectura orientada a servicios para respaldar la presentación de **Akana SOA** en ISO-810.

## Implemented architecture — Phases 0–5

```text
                    ┌─────────────────────┐
                    │ React Service Portal│ :5173
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ SOAForge.Gateway    │ :5100
                    │ YARP                │
                    │ JWT / Authorization │
                    │ Rate limiting       │
                    │ Audit / Metrics     │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
    ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
    │ Customer       │ │ Order          │ │ Payment        │
    │ Service :5101  │ │ Service :5102  │ │ Service :5103  │
    └────────────────┘ └────────────────┘ └────────────────┘
             │                 │                 │
             └──── HTTP contracts + trace headers ─────────┘
```

## Principles

1. **Service autonomy** — cada capacidad de negocio mantiene su frontera.
2. **Explicit contracts** — la integración se expone mediante HTTP/OpenAPI.
3. **Loose coupling** — los consumidores dependen del contrato y no de la implementación interna.
4. **Gateway-mediated access** — el contrato externo pasa por YARP.
5. **Policy enforcement** — JWT, autorización y rate limiting se aplican en el borde.
6. **Observability by design** — correlation ID, trace ID, logs y métricas permiten seguir operaciones.
7. **Versioned edge contract** — `/api/v1/*` desacopla la interfaz pública de la ruta interna.
8. **Akana mapping** — la demo se relaciona conceptualmente con las capacidades estudiadas en Akana sin afirmar que ejecuta Akana.

## Domain

- **CustomerService:** clientes y consultas de identidad comercial.
- **OrderService:** órdenes y validación remota del cliente.
- **PaymentService:** pagos y validación remota de la orden.
- **SOAForge.Gateway:** routing, seguridad, policies, catálogo y observabilidad.
- **Service Portal:** visualización académica de catálogo, health, contratos y métricas.

## Documents

- `PHASE-2-CORE-SERVICES.md`
- `PHASE-3-5-GATEWAY-GOVERNANCE-PORTAL.md`
- `../governance/POLICIES.md`
- `../governance/AKANA-MAPPING.md`
