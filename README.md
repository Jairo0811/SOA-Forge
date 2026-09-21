<div align="center">

# SOAForge

<img src="https://img.shields.io/badge/UNAPEC-ISO--810-003B70?style=for-the-badge" alt="UNAPEC ISO-810" />
<img src="https://img.shields.io/badge/UNAPEC-ISO--815-003B70?style=for-the-badge" alt="UNAPEC ISO-815" />
<img src="https://img.shields.io/badge/Estado-Fase%200%20en%20progreso-14B8A6?style=for-the-badge" alt="Estado: Fase 0 en progreso" />
<img src="https://img.shields.io/badge/Tipo-Laboratorio%20SOA%20%7C%20Portafolio-6F42C1?style=for-the-badge" alt="Laboratorio SOA y proyecto de portafolio" />

<br/><br/>

<a href="https://github.com/Jairo0811/SOA-Forge/actions/workflows/ci.yml">
  <img src="https://github.com/Jairo0811/SOA-Forge/actions/workflows/ci.yml/badge.svg" alt="CI" />
</a>

<br/><br/>

**Enterprise Application Integration Lab**

*SOA · API Management · Governance · Integration · Observability*

</div>

## 📌 Descripción

**SOAForge** es un laboratorio académico de integración de aplicaciones diseñado para demostrar conceptos de **arquitectura orientada a servicios (SOA)**, gobierno de APIs, seguridad, observabilidad y middleware empresarial mediante un mismo dominio de demostración.

El proyecto se utiliza como base técnica compartida para dos asignaturas de UNAPEC durante **Septiembre - Diciembre 2026**:

- **Integración de Aplicaciones con Tecnología Propietaria (ISO-810)**;
- **Integración de Aplicaciones con Tecnología Open Source (ISO-815)**.

La intención es implementar una lógica de negocio común y comparar dos perfiles de integración sin duplicar innecesariamente el dominio.

> 🎓 **Caso académico propietario:** ISO-810 utiliza **Solución Akana SOA** como eje de investigación y presentación. ISO-815 estudia una implementación equivalente mediante componentes open source.

---

## 🎓 Información académica

| Información | Detalle |
|---|---|
| 🏫 Institución | **Universidad APEC (UNAPEC)** |
| 👨‍🏫 Profesor | **Juan Pablo Valdez Reyes** |
| 📅 Período académico | **Septiembre - Diciembre 2026** |
| 📖 Asignatura 1 | **Integración de Aplicaciones con Tecnología Propietaria (ISO-810)** |
| 📖 Asignatura 2 | **Integración de Aplicaciones con Tecnología Open Source (ISO-815)** |
| 📁 Tipo de entrega | **Presentación académica + laboratorio técnico comparativo** |

### 👥 Equipo académico original

| 👤 Integrante | 🆔 Matrícula | ISO-810 | ISO-815 |
|---|---|:---:|:---:|
| 👨🏻‍💻 **Enmanueli Alfonso Rondon Marrero** | **A00115575** | ✅ | ✅ |
| 👨🏻‍💻 **Francis Jairo Matias Rosario** | **A00115261** | ✅ | ✅ |
| 👨🏻‍💻 **Eliandres Rodriguez Cepeda** | **A00112070** | — | ✅ |
| 👨🏻‍💻 **Jorge Alexander Minier Terrero** | **A00105678** | ✅ | ✅ |

> **Eliandres Rodriguez Cepeda participa exclusivamente en ISO-815.** Por tanto, las entregas de ISO-810 deben conservar únicamente a los integrantes que realmente cursan esa asignatura.

---

## 🧭 Continuidad académica

SOAForge presenta dos relaciones académicas verificables dentro de la colección de proyectos preservados de UNAPEC: una por **estudiante recurrente** y otra por **profesor efectivo**.

### 👥 Continuidad por estudiante

**Eliandres Rodriguez Cepeda (A00112070)** participó previamente junto a Francis Jairo Matias Rosario en [**Kognia**](https://github.com/Jairo0811/Kognia), proyecto final de **Gestión de Sitios Web (ISO-700)** durante **Mayo - Agosto 2024**. En **Septiembre - Diciembre 2026** vuelve a coincidir con Francis en SOAForge, específicamente dentro de **ISO-815**.

| Orden | Asignatura | Proyecto | Período |
|---:|---|---|---|
| 1 | Gestión de Sitios Web (ISO-700) | [**Kognia**](https://github.com/Jairo0811/Kognia) | Mayo - Agosto 2024 |
| 2 | Integración de Aplicaciones con Tecnología Open Source (ISO-815) | **SOAForge** | Septiembre - Diciembre 2026 |

La relación es **formativa y cronológica**. Kognia y SOAForge son proyectos independientes y no existe dependencia técnica entre ellos.

### 👨‍🏫 Continuidad por profesor

El profesor **Juan Pablo Valdez Reyes** impartió previamente **Desarrollo de Software con Tecnología Open Source 2 (ISO-715)**, asignatura asociada a [**RentCarRD**](https://github.com/Jairo0811/RentCarRD), durante **Mayo - Agosto 2026**. En el período siguiente aparece como profesor efectivo de las dos asignaturas que comparten SOAForge.

| Orden | Asignatura | Proyecto | Período |
|---:|---|---|---|
| 1 | Desarrollo de Software con Tecnología Open Source 2 (ISO-715) | [**RentCarRD**](https://github.com/Jairo0811/RentCarRD) | Mayo - Agosto 2026 |
| 2 | Integración de Aplicaciones con Tecnología Propietaria (ISO-810) | **SOAForge** | Septiembre - Diciembre 2026 |
| 3 | Integración de Aplicaciones con Tecnología Open Source (ISO-815) | **SOAForge** | Septiembre - Diciembre 2026 |

Esta continuidad se refiere al **profesor efectivo de las asignaturas cursadas**. Se mantiene separada de la relación documental existente en otros proyectos donde Juan Pablo Valdez Reyes figura como autor de enunciados académicos previos.

---

## 🎯 Objetivo

Construir un entorno de demostración donde aplicaciones y servicios independientes se integren a través de una capa de gateway y gobierno, permitiendo comparar un enfoque propietario con una alternativa open source bajo un mismo dominio funcional.

Los objetivos técnicos previstos son:

- separar servicios de negocio;
- centralizar acceso mediante API Gateway;
- aplicar autenticación y políticas;
- documentar contratos de servicio;
- incorporar gobierno y observabilidad;
- comparar equivalencias propietarias y open source;
- preparar un escenario de infraestructura para aproximadamente 500 usuarios;
- respaldar las presentaciones académicas con una demo reproducible.

---

## 🧪 Caso de demostración — NovaCommerce

SOAForge utiliza un dominio empresarial ficticio llamado **NovaCommerce**.

Servicios iniciales previstos:

- **Customer Service**;
- **Order Service**;
- **Payment Service**.

<pre>
Cliente / Portal
      │
      ▼
   API Gateway
      │
      ├── Autenticación
      ├── Políticas
      ├── Routing
      └── Governance
      │
      ▼
┌───────────────────────────┐
│       Servicios SOA       │
│  Customer Service         │
│  Order Service            │
│  Payment Service          │
└─────────────┬─────────────┘
              │
              ▼
 Persistencia + Observabilidad
</pre>

---

## 🧱 Stack tecnológico

> **Estado actual:** SOAForge permanece en **Fase 0**. Los siguientes componentes forman parte del **stack objetivo documentado en el roadmap**, pero todavía no deben interpretarse como implementación funcional completada.

### ⚙️ Servicios y API — planificado

<p>
  <img src="https://skillicons.dev/icons?i=dotnet,cs" alt=".NET y C#" />
  <img src="https://img.shields.io/badge/OpenAPI-Contratos-85EA2D?style=flat-square&logo=swagger&logoColor=black" alt="OpenAPI" />
</p>

- solución .NET;
- servicios Customer, Order y Payment;
- APIs HTTP documentadas mediante OpenAPI;
- integración service-to-service;
- health checks;
- pruebas automatizadas.

### 🎨 Portal web — planificado

<p>
  <img src="https://skillicons.dev/icons?i=react,ts" alt="React y TypeScript" />
</p>

- React;
- TypeScript;
- catálogo de servicios;
- documentación de endpoints;
- visualización de salud y estado;
- concepto de registro de consumidores/aplicaciones.

### 🗄️ Datos e infraestructura — planificado

<p>
  <img src="https://skillicons.dev/icons?i=postgres,docker,git,github,githubactions" alt="PostgreSQL, Docker, Git, GitHub y GitHub Actions" />
</p>

- PostgreSQL para el perfil open source;
- contenedores para el entorno local;
- perfiles separados de infraestructura propietaria y open source;
- Git / GitHub;
- GitHub Actions.

### 🔌 Integración y gobierno

<p>
  <img src="https://img.shields.io/badge/SOA-Service%20Oriented%20Architecture-2563EB?style=flat-square" alt="SOA" />
  <img src="https://img.shields.io/badge/Akana-Caso%20acad%C3%A9mico-7C3AED?style=flat-square" alt="Akana" />
  <img src="https://img.shields.io/badge/API%20Gateway-Planificado-0F766E?style=flat-square" alt="API Gateway planificado" />
</p>

- **ISO-810:** Akana SOA/API Management como caso académico propietario;
- **ISO-815:** gateway e identidad open source por seleccionar y validar durante las fases correspondientes;
- routing centralizado;
- autenticación/autorización;
- JWT;
- rate limiting;
- políticas;
- auditoría.

### 📊 Observabilidad — planificada

- logs estructurados;
- métricas;
- dashboards;
- trazabilidad del flujo de solicitudes.

Las herramientas concretas de observabilidad se seleccionarán durante la fase de implementación; el README no presenta una tecnología específica como implementada antes de esa decisión.

---

## 🏗️ Arquitectura objetivo

<pre>
SOA-Forge/
├── docs/
│   ├── academic/
│   │   ├── ISO-810/
│   │   └── ISO-815/
│   ├── architecture/
│   ├── research/
│   └── ROADMAP.md
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
├── tests/
└── .github/workflows/ci.yml
</pre>

El repositorio ya conserva esta separación conceptual, pero el código de aplicación se incorporará progresivamente a partir de **Fase 1**.

---

## 🔄 Integración continua

Durante Fase 0, el workflow [**ci.yml**](.github/workflows/ci.yml) ejecuta un **quality gate documental** que verifica:

- archivos estructurales requeridos;
- presencia del roadmap;
- secciones académicas esenciales;
- referencias a ISO-810 e ISO-815;
- integridad básica del README.

Cuando se implemente la solución .NET, el portal y las pruebas, el pipeline deberá evolucionar para ejecutar restore, build, tests, lint y validaciones de infraestructura reales.

---

## 🗺️ Roadmap

| Fase | Alcance | Estado |
|---:|---|:---:|
| 0 | Identidad, alcance, arquitectura y estructura | 🟡 En progreso |
| 1 | Customer, Order y Payment Services | ⏳ |
| 2 | API Gateway y comunicación SOA | ⏳ |
| 3 | Autenticación, políticas y governance | ⏳ |
| 4 | Portal web y catálogo de servicios | ⏳ |
| 5 | Stack Open Source para ISO-815 | ⏳ |
| 6 | Observabilidad: logs, métricas y dashboards | ⏳ |
| 7 | Escenario empresarial para 500 usuarios | ⏳ |
| 8 | Investigación completa de Akana | ⏳ |
| 9 | Comparativa propietaria vs. open source | ⏳ |
| 10 | Presentaciones ISO-810 / ISO-815 y demo final | ⏳ |

El detalle verificable de tareas se mantiene en [**docs/ROADMAP.md**](docs/ROADMAP.md).

---

## 📊 Estado actual

**Fase 0 — Foundation: en progreso.**

Ya están definidos:

- identidad y propósito;
- separación de los tracks ISO-810 / ISO-815;
- arquitectura SOA inicial;
- estructura de repositorio;
- equipo y participación por asignatura;
- datos de portada académica.

Según el roadmap actual, resta incorporar los **brand assets finales** para cerrar formalmente la Fase 0.

La implementación funcional comienza en **Fase 1 — Core Services**.

---

## 📚 Documentación

- [**docs/ROADMAP.md**](docs/ROADMAP.md) — fases y tareas;
- [**ISO-810**](docs/academic/ISO-810/) — material de Tecnología Propietaria;
- [**ISO-815**](docs/academic/ISO-815/) — material de Tecnología Open Source;
- [**Arquitectura**](docs/architecture/) — decisiones y diagramas;
- [**Investigación**](docs/research/) — investigación del caso Akana;
- [**src/README.md**](src/README.md) — estructura prevista de código;
- [**infrastructure/README.md**](infrastructure/README.md) — perfiles de infraestructura;
- [**tests/README.md**](tests/README.md) — estrategia de pruebas prevista.

---

<p align="center">
  <strong>SOAForge · Enterprise Application Integration Lab</strong><br/>
  Universidad APEC (UNAPEC) · ISO-810 + ISO-815 · Septiembre - Diciembre 2026
</p>
