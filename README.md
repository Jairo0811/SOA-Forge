<div align="center">

<img src="assets/soaforge-logo.png" alt="SOAForge — Enterprise Application Integration Lab" width="100%" />
<img src="https://img.shields.io/badge/UNAPEC-ISO--810-003B70?style=for-the-badge" alt="UNAPEC ISO-810" />
<br/>

<img src="https://img.shields.io/badge/Primer%20Parcial-Akana%20SOA-7C3AED?style=for-the-badge" alt="Primer parcial: Akana SOA" />
<img src="https://img.shields.io/badge/Fases%200--5-Completadas-22C55E?style=for-the-badge" alt="Fases 0 a 5 completadas" />

<br/><br/>

<a href="https://github.com/Jairo0811/SOA-Forge/actions/workflows/ci.yml">
  <img src="https://github.com/Jairo0811/SOA-Forge/actions/workflows/ci.yml/badge.svg" alt="CI" />
</a>

<br/><br/>

**Enterprise Application Integration Lab**

*SOA · API Management · Governance · Security · Observability*

</div>

## 📌 Descripción

**SOAForge** es el proyecto académico del primer parcial de **Integración de Aplicaciones con Tecnología Propietaria (ISO-810)** en UNAPEC.

El caso asignado al grupo es **Akana SOA**. El repositorio conserva la investigación académica de la plataforma y una demo propia llamada **NovaCommerce** para ilustrar contratos, integración service-to-service, gateway, policies, seguridad, catálogo y observabilidad.

> SOAForge no ejecuta ni clona Akana. La correspondencia con Akana es conceptual y está documentada explícitamente.

---

## 🎓 Información académica

| Información | Detalle |
|---|---|
| 🏫 Institución | **Universidad APEC (UNAPEC)** |
| 👨‍🏫 Profesor | **Juan Pablo Valdez Reyes** |
| 📅 Período académico | **Septiembre - Diciembre 2026** |
| 📖 Asignatura | **Integración de Aplicaciones con Tecnología Propietaria (ISO-810)** |
| 🧩 Primer parcial | **Akana SOA** |
| 📁 Entrega | **Investigación + presentación + demo técnica** |

### 👥 Equipo académico original

| 👤 Integrante | 🆔 Matrícula |
|---|---|
| **Enmanueli Alfonso Rondon Marrero** | **A00115575** |
| **Francis Jairo Matias Rosario** | **A00115261** |
| **Jorge Alexander Minier Terrero** | **A00105678** |

---

## 🎯 Objetivo

Construir un laboratorio reproducible que acompañe la presentación de Akana SOA con una implementación propia de los conceptos técnicos más importantes de una plataforma de integración empresarial.

SOAForge demuestra:

- servicios desacoplados;
- contratos HTTP/OpenAPI;
- integración service-to-service;
- API Gateway central;
- rutas externas versionadas;
- JWT y autorización;
- rate limiting y policies;
- catálogo de servicios;
- health agregado;
- structured logging;
- correlation ID y trace ID;
- métricas operativas;
- portal de servicios React/TypeScript.

---

## 🧪 NovaCommerce

```text
                    ┌─────────────────────┐
                    │ React Service Portal│ :5173
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ SOAForge.Gateway    │ :5100
                    │ YARP                │
                    │ JWT / Policies      │
                    │ Logs / Metrics      │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      CustomerService     OrderService      PaymentService
          :5101              :5102              :5103
```

El flujo conserva las validaciones remotas implementadas en Phase 2: OrderService consulta CustomerService y PaymentService consulta OrderService.

---

## 🧱 Stack implementado

### Core services

- **.NET 10 / ASP.NET Core**
- **C#**
- **OpenAPI**
- CustomerService, OrderService y PaymentService
- xUnit

### Gateway, Security & Governance

- **YARP 2.3.0**
- JWT Bearer
- authorization policy `gateway`
- 60 requests/minuto como policy académica inicial
- rutas `/api/v1/*`
- health agregado
- correlation y trace IDs
- structured request logs
- métricas ligeras del Gateway

### Service Portal

- **React 19**
- **TypeScript**
- **Vite**
- catálogo de servicios
- health/status
- endpoint documentation
- métricas
- token JWT de demostración

---

## 🚀 Ejecución local

Primero inicie los cuatro proyectos .NET:

```bash
dotnet run --project src/Services/CustomerService
dotnet run --project src/Services/OrderService
dotnet run --project src/Services/PaymentService
dotnet run --project src/Gateway
```

Luego el portal:

```bash
cd src/Portal
npm install
npm run dev
```

Use `demo/NovaCommerce.http` para recorrer el flujo mediante el Gateway.

### Credenciales de demo

- usuario: `demo`
- contraseña: `SOAForge2026!`

Estas credenciales y la signing key del repositorio son exclusivamente para ejecución académica local.

---

## 🔐 Governance

Las reglas vigentes están en [**docs/governance/POLICIES.md**](docs/governance/POLICIES.md).

La relación conceptual entre la demo y Akana está en [**docs/governance/AKANA-MAPPING.md**](docs/governance/AKANA-MAPPING.md).

---

## 🔬 Investigación

La investigación completa del primer parcial está en [**docs/research/AKANA-SOA-RESEARCH.md**](docs/research/AKANA-SOA-RESEARCH.md) y cubre los 11 puntos solicitados: SOA, BPM, historia y evolución, características, módulos, componentes, competidores, infraestructura para 500 usuarios, elementos usuales, costos y aspectos adicionales.

---

## 🗺️ Roadmap

| Fase | Alcance | Estado |
|---:|---|:---:|
| 0 | Foundation | ✅ Completada |
| 1 | Investigación completa de Akana SOA | ✅ Completada |
| 2 | Core Services | ✅ Completada |
| 3 | API Gateway y comunicación SOA | ✅ Completada |
| 4 | Seguridad, políticas y governance | ✅ Completada |
| 5 | Portal de servicios y observabilidad | ✅ Completada |
| 6 | Escenario empresarial para 500 usuarios | ▶️ Siguiente |
| 7 | Presentación, demo y cierre académico | ⏳ |

El detalle se mantiene en [**docs/ROADMAP.md**](docs/ROADMAP.md).

---

## 📊 Estado actual

**Fases 0–5: ✅ completadas en la rama de implementación.**

El quality gate de GitHub Actions valida documentación, solución .NET 10, pruebas automatizadas y build del portal. La próxima etapa es **Phase 6 — 500-user Enterprise Scenario**.

---

## 📚 Documentación

- [Roadmap](docs/ROADMAP.md)
- [Akana SOA Research](docs/research/AKANA-SOA-RESEARCH.md)
- [Architecture](docs/architecture/)
- [Phases 3–5](docs/architecture/PHASE-3-5-GATEWAY-GOVERNANCE-PORTAL.md)
- [Governance Policies](docs/governance/POLICIES.md)
- [Akana Mapping](docs/governance/AKANA-MAPPING.md)
- [Gateway](src/Gateway/README.md)
- [Portal](src/Portal/README.md)
- [Tests](tests/README.md)

---

<p align="center">
  <strong>SOAForge · Enterprise Application Integration Lab</strong><br/>
  Universidad APEC (UNAPEC) · ISO-810 · Akana SOA · Septiembre - Diciembre 2026
</p>
