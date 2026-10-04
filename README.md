<div align="center">

<img src="assets/soaforge-logo.png" alt="SOAForge — Enterprise Application Integration Lab" width="100%" />
<img src="https://img.shields.io/badge/UNAPEC-ISO--810-003B70?style=for-the-badge" alt="UNAPEC ISO-810" />
<br/>

<img src="https://img.shields.io/badge/Primer%20Parcial-Akana%20SOA-7C3AED?style=for-the-badge" alt="Primer parcial: Akana SOA" />
<img src="https://img.shields.io/badge/Fases%200--7-Completadas-22C55E?style=for-the-badge" alt="Fases 0 a 7 completadas" />

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

El caso asignado al grupo es **Akana SOA**. El repositorio conserva la investigación académica de la plataforma y una demo propia llamada **NovaCommerce** para ilustrar contratos, integración service-to-service, gateway, policies, seguridad, catálogo, observabilidad y un escenario empresarial para **500 usuarios**.

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
| 👨🏻‍💻 **Jorge Alexander Minier Terrero** | **A00105678** |
| 👨🏻‍💻 **Francis Jairo Matias Rosario** | **A00115261** |
| 👨🏻‍💻 **Enmanueli Alfonso Rondon Marrero** | **A00115575** |

---

## 🧭 Continuidad académica

### 👨‍🏫 Continuidad por profesor

El profesor **Juan Pablo Valdez Reyes** impartió previamente **Desarrollo de Software con Tecnología Open Source 2 (ISO-715)**, asignatura asociada a [**RentCarRD**](https://github.com/Jairo0811/RentCarRD), durante **Mayo - Agosto 2026**. En el período siguiente imparte **Integración de Aplicaciones con Tecnología Propietaria (ISO-810)**, correspondiente a **SOAForge**, durante **Septiembre - Diciembre 2026**.

| Orden | Asignatura | Proyecto | Período |
|---:|---|---|---|
| 1 | Desarrollo de Software con Tecnología Open Source 2 (ISO-715) | [**RentCarRD**](https://github.com/Jairo0811/RentCarRD) | Mayo - Agosto 2026 |
| 2 | Integración de Aplicaciones con Tecnología Propietaria (ISO-810) | **SOAForge** | Septiembre - Diciembre 2026 |

La relación es **docente, formativa y cronológica**. No implica dependencia técnica entre RentCarRD y SOAForge.

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
- portal de servicios React/TypeScript;
- escenario empresarial documentado para 500 usuarios;
- presentación, guion de demo y checklist de entrega.

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

El flujo conserva las validaciones remotas: OrderService consulta CustomerService y PaymentService consulta OrderService.

---

## 🧱 Stack implementado

### ⚙️ Core services

<p>
  <img src="https://skillicons.dev/icons?i=dotnet,cs" alt=".NET y C#" />
  <img src="https://img.shields.io/badge/OpenAPI-Contratos-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="OpenAPI" />
  <img src="https://img.shields.io/badge/xUnit-Testing-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="xUnit" />
</p>

- **.NET 10 / ASP.NET Core**;
- **C#**;
- **OpenAPI**;
- CustomerService, OrderService y PaymentService;
- xUnit.

### 🔐 Gateway, seguridad y gobierno

<p>
  <img src="https://img.shields.io/badge/YARP-2.3.0-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="YARP 2.3.0" />
  <img src="https://img.shields.io/badge/JWT-Bearer-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT Bearer" />
  <img src="https://img.shields.io/badge/API%20Gateway-Governance-0F766E?style=flat-square" alt="API Gateway y Governance" />
</p>

- **YARP 2.3.0**;
- JWT Bearer;
- authorization policy `gateway`;
- 60 requests/minuto como policy académica inicial;
- rutas `/api/v1/*`;
- health agregado;
- correlation y trace IDs;
- structured request logs;
- métricas ligeras del Gateway.

### 🎨 Service Portal

<p>
  <img src="https://skillicons.dev/icons?i=react,ts,vite" alt="React, TypeScript y Vite" />
  <img src="https://img.shields.io/badge/Font%20Awesome-538DD7?style=flat-square&logo=fontawesome&logoColor=white" alt="Font Awesome" />
</p>

- **React 19**;
- **TypeScript**;
- **Vite**;
- catálogo de servicios;
- health/status;
- endpoint documentation;
- métricas;
- token JWT de demostración.

### 🧪 Calidad y CI

<p>
  <img src="https://skillicons.dev/icons?i=git,github,githubactions" alt="Git, GitHub y GitHub Actions" />
  <img src="https://img.shields.io/badge/xUnit-Tests-512BD4?style=flat-square&logo=dotnet&logoColor=white" alt="xUnit tests" />
</p>

- Git / GitHub;
- GitHub Actions;
- restore y build de la solución .NET;
- pruebas automatizadas;
- smoke runtime a través del Gateway;
- build del portal.

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

## 🗺️ Roadmap

| Fase | Alcance | Estado |
|---:|---|:---:|
| 0 | Foundation | ✅ Completada |
| 1 | Investigación completa de Akana SOA | ✅ Completada |
| 2 | Core Services | ✅ Completada |
| 3 | API Gateway y comunicación SOA | ✅ Completada |
| 4 | Seguridad, políticas y governance | ✅ Completada |
| 5 | Portal de servicios y observabilidad | ✅ Completada |
| 6 | Escenario empresarial para 500 usuarios | ✅ Completada |
| 7 | Presentación, demo y cierre académico | ✅ Completada |

---

## 📊 Estado actual

**Fases 0–7: ✅ completadas en la rama de entrega final.**

GitHub Actions valida documentación, solución .NET 10, pruebas automatizadas, smoke runtime a través del Gateway y build del portal.

---

## 📚 Documentación principal

- [Roadmap](docs/ROADMAP.md)
- [Akana SOA Research](docs/research/AKANA-SOA-RESEARCH.md)
- [Architecture](docs/architecture/)
- [Phases 3–5](docs/architecture/PHASE-3-5-GATEWAY-GOVERNANCE-PORTAL.md)
- [500-user Enterprise Scenario](docs/architecture/PHASE-6-500-USER-SCENARIO.md)
- [Final Architecture](docs/architecture/FINAL-ARCHITECTURE.md)
- [Governance Policies](docs/governance/POLICIES.md)
- [Akana Mapping](docs/governance/AKANA-MAPPING.md)
- [Demo Script](docs/academic/ISO-810/DEMO-SCRIPT.md)
- [Presentation Outline](docs/academic/ISO-810/PRESENTATION-OUTLINE.md)
- [Delivery Checklist](docs/DELIVERY-CHECKLIST.md)
- [Release Notes](docs/release/ACADEMIC-RELEASE.md)

---

<p align="center">
  <strong>SOAForge · Enterprise Application Integration Lab</strong><br/>
  Universidad APEC (UNAPEC) · ISO-810 · Akana SOA · Septiembre - Diciembre 2026
</p>
