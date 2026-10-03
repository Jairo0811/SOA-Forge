# Infrastructure

SOAForge documenta únicamente la infraestructura necesaria para la demo de **ISO-810 / Akana SOA**.

## Planned layout

```text
infrastructure/
├── diagrams/
├── docker/
└── deployment/
```

- **diagrams/**: topologías y diagramas del escenario académico.
- **docker/**: recursos locales para levantar la demo cuando corresponda.
- **deployment/**: notas de despliegue, capacidad, seguridad y disponibilidad.

## 500-user scenario

La infraestructura final deberá incluir supuestos explícitos sobre:

- concurrencia;
- número de instancias;
- CPU y memoria;
- base de datos;
- alta disponibilidad;
- balanceo/routing;
- seguridad;
- logs y métricas;
- respaldo y recuperación;
- costos estimados.

La topología será una propuesta académica y se diferenciará claramente de cualquier requisito oficial publicado por Akana.
