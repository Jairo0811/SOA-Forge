# Academic Release — SOAForge

## Release candidate

**Suggested tag:** `academic-iso810-akana-soa-v1.0`

The tag should be created after the stacked PRs are merged into `main`.

## Included phases

| Phase | Status |
|---:|---|
| 0 — Foundation | Completed |
| 1 — Akana SOA Research | Completed |
| 2 — Core Services Demo | Completed |
| 3 — API Gateway and SOA Integration | Completed |
| 4 — Security and Governance | Completed |
| 5 — Service Portal and Observability | Completed |
| 6 — 500-user Enterprise Scenario | Completed |
| 7 — Academic Delivery | Completed |

## Deliverables

- Research document: `docs/research/AKANA-SOA-RESEARCH.md`.
- Gateway and governance docs: `docs/governance/`.
- Architecture docs: `docs/architecture/`.
- 500-user scenario: `docs/architecture/PHASE-6-500-USER-SCENARIO.md`.
- Presentation outline: `docs/academic/ISO-810/PRESENTATION-OUTLINE.md`.
- Demo script: `docs/academic/ISO-810/DEMO-SCRIPT.md`.
- Presentation source: `docs/presentation/SOAForge-ISO810-Akana-SOA.md`.
- Delivery checklist: `docs/DELIVERY-CHECKLIST.md`.

## Validation status

The CI pipeline validates:

- required documentation files;
- ISO-810/Akana scope guard;
- .NET 10 restore/build/tests;
- runtime smoke through the Gateway;
- React portal install/build.

## Known academic limitations

- SOAForge is not Akana and does not use Akana runtime components.
- Infrastructure sizing is academic and assumption-based.
- Commercial pricing requires vendor or partner quotation.
- Persistence remains in-memory for demo reproducibility.
