# SOAForge Service Portal

Portal de **Phase 5** construido con React + TypeScript + Vite.

## Funciones

- catálogo visual de Customer, Order y Payment;
- rutas públicas versionadas del Gateway;
- enlaces a OpenAPI de los upstreams;
- health agregado en tiempo real;
- métricas básicas del Gateway;
- solicitud del JWT de demostración;
- resumen de policies de seguridad y governance.

## Ejecutar

```bash
cd src/Portal
npm install
npm run dev
```

Por defecto utiliza `http://localhost:5100` como Gateway. Puede cambiarse copiando `.env.example` a `.env` y ajustando `VITE_GATEWAY_URL`.

## Build

```bash
npm run build
```

GitHub Actions valida el build del portal junto con la solución .NET.
