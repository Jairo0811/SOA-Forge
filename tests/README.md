# Tests

La suite automatizada vive en:

`tests/SOAForge.Core.Tests/`

## Cobertura actual

- CustomerRepository seed y creación.
- OrderRepository persistencia y estado inicial.
- PaymentRepository persistencia y aprobación.
- generación de JWT del Gateway.
- métricas del Gateway.

## Ejecutar backend tests

```bash
dotnet test SOAForge.slnx --configuration Release
```

## Validación frontend

```bash
cd src/Portal
npm install
npm run build
```

GitHub Actions valida documentación, restore/build/tests de .NET 10 y build del portal React.
