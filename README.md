# SOAForge

**Enterprise Application Integration Lab**

SOAForge es un proyecto académico orientado a demostrar, mediante una implementación funcional, conceptos de **arquitectura orientada a servicios (SOA)**, integración de aplicaciones, gobierno de APIs, seguridad, observabilidad y middleware empresarial.

El proyecto sirve como base técnica compartida para dos asignaturas de UNAPEC:

- **ISO-810 — Integración de Aplicaciones con Tecnología Propietaria**
  - Caso académico principal: **Solución Akana SOA**.
- **ISO-815 — Integración de Aplicaciones con Tecnología Open Source**
  - Implementación equivalente con componentes open source.

## Objetivo

Construir un laboratorio donde varias aplicaciones y servicios independientes se integren a través de una capa de gateway y gobierno, permitiendo comparar un enfoque propietario con una alternativa open source sin duplicar la lógica de negocio.

## Caso de demostración

SOAForge utilizará un dominio empresarial ficticio llamado **NovaCommerce** con tres servicios iniciales:

- **Customer Service**
- **Order Service**
- **Payment Service**

Flujo inicial:

```text
Cliente
  ↓
API Gateway
  ↓
Autenticación / Políticas
  ↓
Servicios SOA
  ├── Customer Service
  ├── Order Service
  └── Payment Service
  ↓
Persistencia + Observabilidad
```

## Estructura prevista

```text
SOA-Forge/
├── docs/
│   ├── academic/
│   │   ├── ISO-810/
│   │   └── ISO-815/
│   ├── architecture/
│   └── research/
├── src/
│   ├── Gateway/
│   ├── Services/
│   │   ├── CustomerService/
│   │   ├── OrderService/
│   │   └── PaymentService/
│   └── Portal/
├── infrastructure/
│   ├── proprietary/
│   ├── opensource/
│   └── docker/
└── tests/
```

## Roadmap

| Fase | Alcance |
|---|---|
| 0 | Identidad, alcance, arquitectura y estructura |
| 1 | Customer, Order y Payment Services |
| 2 | API Gateway y comunicación SOA |
| 3 | Autenticación, políticas y governance |
| 4 | Portal web y catálogo de servicios |
| 5 | Stack Open Source para ISO-815 |
| 6 | Observabilidad: logs, métricas y dashboards |
| 7 | Escenario de infraestructura para 500 usuarios |
| 8 | Investigación completa de Akana |
| 9 | Comparativa propietaria vs. open source |
| 10 | Presentaciones ISO-810 / ISO-815 y demo final |

## Estado

**Fase 0 — En progreso**

---

Proyecto académico para UNAPEC.
