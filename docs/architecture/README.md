# Architecture

## Architectural Style

SOAForge adopta una arquitectura orientada a servicios con un punto de entrada controlado mediante API Gateway.

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
                       Data / Messaging / Logs
```

## Principles

1. **Service autonomy** — each business capability owns its application boundary.
2. **Explicit contracts** — integrations are exposed through documented APIs.
3. **Loose coupling** — consumers depend on contracts, not internal implementation.
4. **Centralized edge governance** — external traffic enters through a gateway.
5. **Observability by design** — requests must be traceable across service boundaries.
6. **Replaceable infrastructure** — business services should not depend on one gateway vendor.
7. **Academic comparability** — proprietary and open-source profiles implement equivalent concerns.

## Initial Domain

### Customer Service
Owns customer profiles and customer lookup operations.

### Order Service
Owns orders and coordinates customer validation before order creation.

### Payment Service
Owns payment records and payment state transitions.

## First integration scenario

1. A consumer creates or selects a customer.
2. The consumer creates an order.
3. Order Service validates the customer through Customer Service.
4. A payment is registered against the order.
5. The request flow is logged and observable through the integration layer.
