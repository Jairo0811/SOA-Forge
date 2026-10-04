# Tests

Phase 2 incorpora pruebas automatizadas en:

`tests/SOAForge.Core.Tests/`

La suite valida el comportamiento base de los repositorios de Customer, Order y Payment.

## Ejecutar

```bash
dotnet test SOAForge.slnx --configuration Release
```

GitHub Actions ejecuta restore, build y tests en cada pull request hacia `main`.

Las pruebas de gateway, seguridad y end-to-end se ampliarán en fases posteriores.
