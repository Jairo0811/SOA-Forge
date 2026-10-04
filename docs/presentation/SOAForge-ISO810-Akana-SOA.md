# SOAForge — Akana SOA Presentation Source

Este documento es la fuente textual de la presentación final. La versión editable en PowerPoint se preparó como artefacto de entrega y el guion extendido está en `docs/academic/ISO-810/DEMO-SCRIPT.md`.

## 1. Portada

**SOAForge**  
Enterprise Application Integration Lab  
ISO-810 — Integración de Aplicaciones con Tecnología Propietaria  
Caso: Akana SOA

## 2. Contexto académico

SOAForge acompaña la presentación del primer parcial. El proyecto combina investigación de Akana SOA con una demo programada propia.

## 3. Problema

Las organizaciones no solo exponen APIs; también necesitan gobierno, seguridad, versionado, catálogo, trazabilidad y control operativo.

## 4. Akana como caso de estudio

Akana se estudia como plataforma comercial real asociada a API Management y SOA governance. SOAForge reproduce conceptos de forma académica, no el producto.

## 5. Arquitectura de la demo

Portal → Gateway → CustomerService / OrderService / PaymentService.

## 6. Flujo NovaCommerce

Token → clientes → orden → pago → health → métricas.

## 7. Seguridad y governance

JWT, autorización, rate limiting, correlation ID, trace ID, logs estructurados y políticas documentadas.

## 8. Portal y observabilidad

El portal muestra catálogo, rutas, responsabilidades, estado de servicios, métricas y token demo.

## 9. Escenario de 500 usuarios

Topología propuesta: WAF/LB, dos gateways, dos instancias por servicio, base de datos con respaldo, observabilidad centralizada y seguridad por capas.

## 10. Guion de demo

Levantar servicios, generar token, consumir rutas versionadas, crear orden y pago, mostrar health y métricas.

## 11. Conclusión

SOAForge permite defender que SOA no es solo comunicación entre APIs: requiere gobierno, políticas, seguridad y operación.
