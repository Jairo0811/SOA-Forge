# SOAForge Delivery Checklist

## Academic content

- [x] Datos académicos completos.
- [x] Integrantes correctos para ISO-810.
- [x] Investigación Akana SOA completa.
- [x] Fuentes y fecha de consulta en investigación.
- [x] Diferenciación explícita entre Akana real y SOAForge académico.
- [x] Escenario de 500 usuarios documentado.
- [x] Costos tratados como cotización comercial vs estimación técnica.

## Technical demo

- [x] CustomerService.
- [x] OrderService.
- [x] PaymentService.
- [x] Gateway YARP.
- [x] JWT demo.
- [x] Authorization policy.
- [x] Rate limiting.
- [x] Service catalog.
- [x] Aggregated health.
- [x] Metrics endpoint.
- [x] React portal.
- [x] Demo HTTP flow.

## Validation

- [x] Documentation integrity gate.
- [x] .NET restore.
- [x] Release build.
- [x] xUnit tests.
- [x] Runtime smoke through Gateway.
- [x] React portal build.

## Presentation readiness

- [x] Presentation outline.
- [x] Presentation source.
- [x] Demo script.
- [x] Final architecture document.
- [x] 500-user topology.
- [x] Academic release notes.

## Merge order

1. Merge PR for Phases 1–2.
2. Merge PR for Phases 3–5.
3. Merge PR for Phases 6–7.
4. Create release tag after all PRs are on `main`.

Suggested tag:

```bash
git tag academic-iso810-akana-soa-v1.0
git push origin academic-iso810-akana-soa-v1.0
```
