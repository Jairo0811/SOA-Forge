# SOAForge Roadmap

SOAForge corresponde exclusivamente a **ISO-810 — Integración de Aplicaciones con Tecnología Propietaria** y al caso **Akana SOA** del primer parcial.

## Phase 0 — Foundation ✅
- [x] Define project identity and purpose.
- [x] Confirm ISO-810 scope.
- [x] Confirm team members.
- [x] Complete academic metadata.
- [x] Define initial SOA demo architecture.
- [x] Separate SOAForge from the open-source integration project.
- [x] Add final brand assets.

**Status:** Completed.

## Phase 1 — Akana SOA Research ✅
- [x] Introducción al SOA.
- [x] Introducción a BPM.
- [x] Historia y evolución de Akana.
- [x] Características principales.
- [x] Módulos de la plataforma.
- [x] Componentes principales.
- [x] Principales competidores.
- [x] Infraestructura para 500 usuarios.
- [x] Elementos usuales de una solución SOA con Akana.
- [x] Costos aproximados para 500 usuarios, diferenciando cotización comercial y estimación técnica.
- [x] Aspectos adicionales y fuentes.

**Status:** Completed. See `docs/research/AKANA-SOA-RESEARCH.md`.

## Phase 2 — Core Services Demo ✅
- [x] Create .NET solution.
- [x] Implement Customer Service.
- [x] Implement Order Service.
- [x] Implement Payment Service.
- [x] Add OpenAPI documentation.
- [x] Add service-to-service integration.
- [x] Add automated tests.

**Status:** Completed and validated by CI.

## Phase 3 — API Gateway and SOA Integration ✅
- [x] Centralize routing through the gateway.
- [x] Add health checks.
- [x] Introduce versioned routes.
- [x] Add basic traffic policies.
- [x] Demonstrate gateway-mediated access.

**Status:** Completed with ASP.NET Core + YARP.

## Phase 4 — Security and Governance ✅
- [x] Authentication and authorization.
- [x] JWT validation.
- [x] Rate limiting.
- [x] Policy documentation.
- [x] Audit logging.
- [x] Document how each concept maps to the Akana research case.

**Status:** Completed. See `docs/governance/`.

## Phase 5 — Service Portal and Observability ✅
- [x] React + TypeScript portal.
- [x] Service catalog.
- [x] Endpoint documentation.
- [x] Health and status view.
- [x] Structured logs.
- [x] Metrics and request tracing.

**Status:** Completed. Portal build and .NET implementation are validated by CI.

## Phase 6 — 500-user Enterprise Scenario ✅
- [x] Define capacity assumptions.
- [x] Create infrastructure diagram.
- [x] Document availability and scalability proposal.
- [x] Document security boundaries.
- [x] Estimate infrastructure requirements.
- [x] Connect assumptions with cost research.

**Status:** Completed. See `docs/architecture/PHASE-6-500-USER-SCENARIO.md` and `infrastructure/500-user-topology.md`.

## Phase 7 — Academic Delivery ✅
- [x] Build ISO-810 presentation outline.
- [x] Prepare live demo script.
- [x] Prepare final architecture diagrams.
- [x] Review sources and citations.
- [x] Rehearse presentation and demo checklist.
- [x] Repository cleanup documentation.
- [x] Prepare academic release notes.

**Status:** Completed. See `docs/academic/ISO-810/`, `docs/presentation/`, `docs/DELIVERY-CHECKLIST.md` and `docs/release/ACADEMIC-RELEASE.md`.

## Final status

**Fases 0–7 completadas.** El proyecto queda listo para defensa académica y para fusionarse siguiendo el orden de PRs apilados: Phase 1–2, Phase 3–5 y Phase 6–7.
