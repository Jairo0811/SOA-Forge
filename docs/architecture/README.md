# Architecture

SOAForge ya no se modela como una única solución comparativa. El repositorio contiene **dos líneas técnicas independientes** por parcial.

## ISO-810 / Primer parcial — Akana SOA

```text
Consumer / Client
       │
       ▼
 SOA / API Layer
       │
 ┌─────┼──────────────┐
 ▼     ▼              ▼
Service A         Service B         Service C
       │
       ▼
 Policies / Governance / Observability
```

La demo enfatizará contratos, integración de servicios, routing, políticas y gobierno.

## ISO-815 / Primer parcial — BonitaSoft BPM

```text
User / Request
      │
      ▼
 BPM Process
      │
 ┌────┼───────────────┐
 ▼    ▼               ▼
Task  Decision     Service/Connector
      │
      ▼
 Completion / Audit
```

La demo enfatizará modelado de procesos, tareas humanas, decisiones, formularios e integración.

## Principle

La separación es académica y técnica:

1. cada asignatura tiene su propia presentación;
2. cada parcial tiene su propio caso asignado;
3. cada demo debe poder explicarse y ejecutarse de manera independiente;
4. componentes reutilizables pueden compartirse solo cuando no mezclen el propósito de las entregas.
