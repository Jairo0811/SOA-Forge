# Architecture

SOAForge adopta una arquitectura orientada a servicios para respaldar la presentación de **Akana SOA** en ISO-810.

## Target architecture

```text
                       ┌──────────────────────┐
                       │   Web / Consumers    │
                       └──────────┬───────────┘
                                  │
                                  ▼
                       ┌──────────────────────┐
                       │      API Gateway     │
                       │ routing · policies   │
                       │ auth · rate limits   │
                       └──────────┬───────────┘
                                  │
             ┌────────────────────┼────────────────────┐
             │                    │                    │
             ▼                    ▼                    ▼
    ┌────────────────┐   ┌────────────────┐   ┌────────────────┐
    │ Customer       │   │ Order          │   │ Payment        │
    │ Service        │   │ Service        │   │ Service        │
    └────────────────┘   └────────────────┘   └────────────────┘
             │                    │                    │
             └────────────────────┼────────────────────┘
                                  ▼
                       Data / Logs / Metrics
```

## Principles

1. **Service autonomy** — cada capacidad de negocio mantiene su frontera.
2. **Explicit contracts** — la integración se expone mediante contratos documentados.
3. **Loose coupling** — los consumidores dependen del contrato y no de la implementación interna.
4. **Gateway-mediated access** — el tráfico externo pasa por un punto de control.
5. **Policy enforcement** — autenticación, autorización, límites y reglas se aplican de forma explícita.
6. **Observability by design** — las solicitudes deben poder rastrearse entre servicios.
7. **Akana mapping** — la documentación indicará qué concepto de la demo corresponde a capacidades estudiadas en Akana, sin afirmar que la demo ejecuta Akana.

## Initial domain

### Customer Service
Gestiona clientes y consultas de identidad de negocio.

### Order Service
Gestiona órdenes y valida la existencia del cliente antes de crear una orden.

### Payment Service
Gestiona pagos y estados de pago asociados a órdenes.

## First integration scenario

1. Se crea o consulta un cliente.
2. Se solicita la creación de una orden.
3. Order Service consulta Customer Service.
4. Se registra un pago contra la orden.
5. El acceso externo se enruta mediante el Gateway.
6. La operación queda registrada para observabilidad y auditoría.
