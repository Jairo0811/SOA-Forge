# Final Architecture

## Resultado final

SOAForge queda como laboratorio académico de integración empresarial para explicar Akana SOA desde una implementación propia.

```text
React Service Portal
        │
        ▼
SOAForge Gateway
YARP · JWT · Authorization · Rate Limit · Logs · Metrics
        │
        ├── /api/v1/customers ───► CustomerService
        ├── /api/v1/orders    ───► OrderService ───► CustomerService
        └── /api/v1/payments  ───► PaymentService ─► OrderService
```

## Mapeo por fase

| Fase | Elemento arquitectónico |
|---:|---|
| 0 | identidad, alcance ISO-810 y branding |
| 1 | investigación Akana SOA |
| 2 | servicios Customer, Order y Payment |
| 3 | Gateway y rutas versionadas |
| 4 | JWT, authorization, rate limiting, audit logs |
| 5 | portal React y observabilidad |
| 6 | escenario empresarial para 500 usuarios |
| 7 | presentación, demo script y cierre académico |

## Decisiones clave

1. **Gateway como contrato externo:** el consumidor no necesita conocer los puertos internos.
2. **Servicios desacoplados:** cada servicio mantiene su responsabilidad y se integra por HTTP.
3. **Seguridad centralizada:** el Gateway valida JWT antes de enrutar.
4. **Gobierno documentado:** las políticas y el mapeo conceptual con Akana están separados de la implementación.
5. **Observabilidad mínima:** health, métricas, correlation ID y logs estructurados.
6. **Demo defendible:** CI valida build, pruebas, portal y smoke runtime a través del Gateway.

## Limitaciones intencionales

- La persistencia es in-memory en la demo académica.
- No se ejecuta Akana real.
- La equivalencia con Akana es conceptual.
- Los costos comerciales requieren cotización del fabricante o partner.

## Conclusión arquitectónica

SOAForge demuestra el flujo mínimo de una integración empresarial gobernada: contratos, gateway, políticas, seguridad, trazabilidad, catálogo y operación.
