# Source Code

La implementación de **Phase 2 — Core Services Demo** está organizada como tres servicios ASP.NET Core independientes.

```text
src/
└── Services/
    ├── CustomerService/
    ├── OrderService/
    └── PaymentService/
```

## Puertos locales

- CustomerService — `http://localhost:5101`
- OrderService — `http://localhost:5102`
- PaymentService — `http://localhost:5103`

## Ejecución

En tres terminales:

```bash
dotnet run --project src/Services/CustomerService
dotnet run --project src/Services/OrderService
dotnet run --project src/Services/PaymentService
```

Luego puede utilizarse `demo/NovaCommerce.http` para recorrer el flujo.

## Integración

- OrderService valida `CustomerId` consultando CustomerService por HTTP.
- PaymentService valida `OrderId` consultando OrderService por HTTP.
- Cada servicio expone OpenAPI mediante ASP.NET Core.

La persistencia de Phase 2 es in-memory; la prioridad es demostrar contratos y comunicación SOA.
