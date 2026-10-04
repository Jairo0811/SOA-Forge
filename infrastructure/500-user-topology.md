# 500-user Topology

## Vista de infraestructura

```text
┌──────────────────────────┐
│  500 usuarios nominales  │
│  150 concurrentes pico   │
└────────────┬─────────────┘
             │ HTTPS
             ▼
┌──────────────────────────┐
│ WAF / Load Balancer      │
│ TLS · routing · filtering│
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ API Gateway Cluster      │
│ Gateway A · Gateway B    │
└────────────┬─────────────┘
             │
             ▼
┌─────────────────────────────────────────────┐
│ Application Services                         │
│ Customer x2 · Order x2 · Payment x2          │
└────────────┬────────────────────────────────┘
             │
             ▼
┌──────────────────────────┐
│ Database Layer           │
│ Primary · Replica/Backup │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│ Observability            │
│ Logs · Metrics · Alerts  │
└──────────────────────────┘
```

## Deployment profiles

### Perfil académico local

- 1 proceso por servicio.
- 1 Gateway.
- Portal Vite local.
- Repositorios in-memory.
- CI smoke runtime.

### Perfil empresarial propuesto

- 2 instancias de Gateway.
- 2 instancias por servicio.
- Base de datos persistente.
- Logs y métricas centralizados.
- TLS y WAF delante del Gateway.
- Secret management externo.
- Backups y recovery plan.

## Recomendación de despliegue

Para defensa académica se mantiene el perfil local porque es reproducible. Para discusión empresarial se usa la topología de 500 usuarios como diseño objetivo.
