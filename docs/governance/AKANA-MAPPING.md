# SOAForge ↔ Akana Concept Mapping

SOAForge **no ejecuta Akana**. Esta matriz relaciona elementos de la demo con capacidades conceptuales investigadas para facilitar la exposición académica.

| SOAForge | Concepto empresarial asociado | Propósito en la demo |
|---|---|---|
| YARP API Gateway | API gateway / mediation | Punto central de entrada y routing |
| JWT validation | API security | Validar identidad antes de llegar al servicio |
| Authorization policy | Policy enforcement | Aplicar reglas de acceso en el borde |
| Fixed-window rate limit | Traffic policy | Controlar consumo y proteger upstreams |
| `/catalog` | Service/API catalog | Exponer inventario de capacidades |
| `/health/services` | Operational governance | Conocer disponibilidad de servicios |
| Correlation/trace IDs | Monitoring and traceability | Seguir solicitudes a través de la capa de integración |
| Structured request logs | Audit / analytics | Registrar evidencia operativa |
| Versioned `/api/v1/*` routes | Lifecycle/version governance | Separar contrato externo de implementación |

## Regla académica

Durante la presentación debe distinguirse siempre entre:

1. **Akana como producto comercial real**, documentado en la investigación; y
2. **SOAForge como laboratorio propio**, que reproduce de forma simplificada principios de gateway, políticas, seguridad, catálogo y observabilidad.

La equivalencia es conceptual; no implica compatibilidad binaria, funcionalidad idéntica ni uso de una licencia Akana.
