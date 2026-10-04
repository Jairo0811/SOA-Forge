# Phases 3–5 — Gateway, Governance, Portal and Observability

## Resultado

Las fases 3, 4 y 5 convierten el núcleo de NovaCommerce en una demo SOA gobernada desde un punto de entrada central.

```text
                    ┌─────────────────────┐
                    │ React Service Portal│ :5173
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ SOAForge.Gateway    │ :5100
                    │ YARP + JWT + Policy │
                    │ Rate limit + Audit  │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      CustomerService     OrderService      PaymentService
          :5101              :5102              :5103
             │                 │                 │
             └──────────── HTTP service-to-service ────────┘
```

## Phase 3 — API Gateway and SOA Integration

- YARP actúa como reverse proxy central.
- El contrato externo está versionado bajo `/api/v1/*`.
- Los tres upstreams permanecen desacoplados del contrato externo.
- `/health/services` agrega el estado de los servicios.
- `demo/NovaCommerce.http` demuestra acceso mediado por Gateway.

## Phase 4 — Security and Governance

- autenticación JWT Bearer;
- policy `gateway` para rutas proxied;
- rate limiting de 60 requests/minuto;
- logging estructurado de auditoría;
- propagación de correlation ID;
- trace ID por request;
- documentación formal de policies;
- matriz conceptual SOAForge ↔ Akana.

## Phase 5 — Service Portal and Observability

El portal React/TypeScript consume endpoints operativos del Gateway y presenta:

- catálogo de servicios;
- contratos versionados;
- enlaces OpenAPI;
- estado de Customer, Order y Payment;
- total de requests y fallos;
- latencia promedio observada en el Gateway;
- formulario de token JWT académico.

## Límites intencionales

La observabilidad de esta fase es ligera y autocontenida. No se incorpora todavía un backend externo de métricas o tracing. El objetivo del primer parcial es demostrar los conceptos de governance y observabilidad de forma reproducible y fácil de exponer.
