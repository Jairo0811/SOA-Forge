# Phase 6 — 500-user Enterprise Scenario

## Objetivo

Documentar una propuesta académica de infraestructura para operar SOAForge/NovaCommerce como si fuera una solución empresarial orientada a servicios para **500 usuarios nominales**.

La propuesta no es una cotización comercial de Akana ni un sizing oficial de Perforce. Es un escenario académico trazable a los conceptos investigados: API gateway, gobierno, seguridad, observabilidad, alta disponibilidad y operación de servicios.

## Supuestos de capacidad

| Variable | Supuesto académico |
|---|---:|
| Usuarios nominales | 500 |
| Concurrencia pico estimada | 150 usuarios |
| Operaciones pico estimadas | 10–15 requests/segundo |
| Horario crítico | Jornada laboral extendida |
| Disponibilidad objetivo | 99.5% académico |
| Patrón de tráfico | Lecturas frecuentes, escrituras moderadas |
| Datos de la demo | Clientes, órdenes, pagos, logs y métricas |

## Topología propuesta

```text
Usuarios / Navegadores
        │
        ▼
Internet / Red corporativa
        │
        ▼
WAF / Load Balancer / TLS termination
        │
        ▼
API Gateway Cluster
  ├── Gateway Node A
  └── Gateway Node B
        │
        ▼
Application Services
  ├── CustomerService x2
  ├── OrderService x2
  └── PaymentService x2
        │
        ▼
Data Layer
  ├── SQL Server / Managed Database primary
  ├── Replica / backup target
  └── Object storage para backups/exportaciones
        │
        ▼
Observability
  ├── Centralized logs
  ├── Metrics dashboard
  ├── Alerting
  └── Audit trail
```

## Infraestructura mínima recomendada

| Capa | Capacidad mínima académica | Justificación |
|---|---|---|
| Load balancer / WAF | 1 servicio administrado o 2 nodos | TLS, control de entrada y disponibilidad |
| Gateway | 2 instancias, 2 vCPU / 4 GB RAM cada una | Routing, JWT, rate limiting y políticas |
| CustomerService | 2 instancias, 1–2 vCPU / 2 GB RAM | Servicio simple de catálogo de clientes |
| OrderService | 2 instancias, 2 vCPU / 4 GB RAM | Más integración y validación remota |
| PaymentService | 2 instancias, 2 vCPU / 4 GB RAM | Validación de orden y operación crítica |
| Base de datos | 2 vCPU / 8 GB RAM mínimo, storage SSD | Persistencia transaccional para demo ampliada |
| Observabilidad | 2 vCPU / 4–8 GB RAM | Logs, métricas y tableros |
| Backup | Retención 7/30/90 | Recuperación operativa y auditoría |

## Seguridad y límites

1. **TLS obligatorio** en tráfico externo.
2. **JWT/OIDC** para consumidores autenticados.
3. **Rate limiting** por consumidor, ambiente y tipo de API.
4. **RBAC** para operación y administración.
5. **Secrets fuera del repositorio**: vault, user-secrets o servicio administrado.
6. **Segmentación de red** entre entrada, aplicaciones, base de datos y observabilidad.
7. **Auditoría** de accesos, errores, cambios de configuración y eventos críticos.
8. **Backups cifrados** con pruebas de restauración.

## Escalabilidad

La demo actual escala horizontalmente en las capas stateless:

- Gateway.
- CustomerService.
- OrderService.
- PaymentService.
- Portal estático.

La capa de datos requiere estrategia dedicada: base administrada, réplica, failover, backups y mantenimiento.

## Relación con la investigación de costos

Akana/Perforce no publica un precio universal para una implantación de 500 usuarios. Por eso SOAForge separa dos elementos:

- **Costo comercial Akana:** requiere cotización del fabricante o partner.
- **Costo técnico de infraestructura:** puede estimarse por nodos, vCPU, memoria, almacenamiento, monitoreo, licencias del sistema operativo/base de datos y soporte operativo.

## Riesgos principales

| Riesgo | Mitigación |
|---|---|
| Gateway como punto crítico | Dos nodos + load balancer |
| Fallo de base de datos | réplica, backups y plan de recuperación |
| Saturación por tráfico | rate limiting, escalado horizontal y alertas |
| Exposición de secretos | vault y rotación de claves |
| Falta de trazabilidad | correlation ID, logs estructurados y métricas |
| Costos no verificables | separar estimaciones académicas de cotización comercial |

## Conclusión

Para 500 usuarios, SOAForge requiere una arquitectura modesta pero gobernada: gateway redundante, servicios stateless replicados, base de datos con respaldo, observabilidad centralizada y controles de seguridad. El valor académico está en mostrar que SOA no es solo consumo de APIs: también implica gobierno, seguridad, operación y trazabilidad.
