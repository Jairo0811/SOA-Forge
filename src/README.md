# Source Code

SOAForge tiene implementadas las capas técnicas de **Phases 2–5**.

```text
src/
├── Gateway/
│   └── ASP.NET Core 10 + YARP
├── Services/
│   ├── CustomerService/
│   ├── OrderService/
│   └── PaymentService/
└── Portal/
    └── React + TypeScript + Vite
```

## Puertos locales

- Gateway — `http://localhost:5100`
- CustomerService — `http://localhost:5101`
- OrderService — `http://localhost:5102`
- PaymentService — `http://localhost:5103`
- Service Portal — `http://localhost:5173`

## Ejecutar backend

En cuatro terminales:

```bash
dotnet run --project src/Services/CustomerService
dotnet run --project src/Services/OrderService
dotnet run --project src/Services/PaymentService
dotnet run --project src/Gateway
```

El acceso externo recomendado es mediante las rutas versionadas del Gateway.

## Ejecutar portal

```bash
cd src/Portal
npm install
npm run dev
```

## Integración

- OrderService valida clientes mediante CustomerService.
- PaymentService valida órdenes mediante OrderService.
- YARP centraliza el tráfico externo.
- JWT y authorization policy protegen los endpoints proxied.
- rate limiting aplica una política inicial de 60 requests/minuto.
- el Gateway agrega health, correlation/trace IDs, logs y métricas.
- el Portal consume el estado operativo y presenta el catálogo de servicios.
