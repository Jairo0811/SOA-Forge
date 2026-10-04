# Akana SOA — Investigación del Primer Parcial

**Asignatura:** Integración de Aplicaciones con Tecnología Propietaria (ISO-810)  
**Profesor:** Juan Pablo Valdez Reyes  
**Período:** Septiembre - Diciembre 2026  
**Fecha de verificación:** 4 de octubre de 2026

> Esta investigación responde a los 11 puntos del enunciado académico. Cuando un dato no está publicado por el fabricante —especialmente precios y dimensionamiento para una carga concreta— se indica explícitamente en lugar de inventarlo.

## Nota de verificación sobre el proveedor

El enunciado recibido utiliza la denominación **“Solución Akana (Microsot) SOA”**. Las fuentes oficiales actuales no sitúan Akana como producto de Microsoft. **Akana forma parte de Perforce** desde la adquisición de Rogue Wave Software en 2019. Por rigor académico, SOAForge conserva el nombre del caso asignado, pero documenta la propiedad vigente según fuentes oficiales.

## 1. Introducción a SOA

**SOA (Service-Oriented Architecture)** es un estilo arquitectónico que organiza capacidades de negocio como servicios con contratos explícitos, reutilizables e interoperables. El consumidor depende del contrato del servicio y no de su implementación interna, lo que favorece el **bajo acoplamiento**, la reutilización y la integración entre plataformas heterogéneas.

En un entorno empresarial SOA suelen aparecer estas responsabilidades:

- proveedor del servicio;
- consumidor del servicio;
- contrato o descripción del servicio;
- mecanismos de descubrimiento/catálogo;
- mediación y routing;
- seguridad y políticas;
- monitoreo y gobierno.

Akana encaja especialmente en las capas de **API management, gateway, seguridad, mediación, catálogo, lifecycle y governance**.

## 2. Introducción a BPM

**BPM (Business Process Management)** es una disciplina sistemática para descubrir, modelar, analizar, medir y mejorar procesos de negocio repetibles. Mientras SOA organiza capacidades técnicas y de negocio como servicios reutilizables, BPM puede coordinar esos servicios y tareas humanas dentro de un flujo de negocio de extremo a extremo.

La relación conceptual es directa: un proceso BPM puede invocar servicios expuestos mediante SOA, y una plataforma de gobierno puede controlar contratos, seguridad, versiones y políticas de esos servicios.

## 3. Historia y evolución de Akana

| Año | Hito |
|---:|---|
| **2001** | La empresa se funda con el nombre **Digital Evolution**. |
| **2005** | Cambia su nombre a **SOA Software**. |
| **2006** | Adquiere **Blue Titan**, empresa enfocada en web services networking. |
| **2008** | Adquiere **LogicLibrary**, orientada a repositorio y gobierno SOA. |
| **2015** | SOA Software cambia su nombre a **Akana**, reflejando la evolución desde SOA/web services hacia API management. |
| **2016** | **Rogue Wave Software** adquiere Akana. |
| **2019** | **Perforce Software** adquiere Rogue Wave; Akana pasa a formar parte del portafolio de Perforce. |
| **2026** | La documentación vigente identifica **Akana API Platform 2026.3** y mantiene una estrategia de releases STS/LTS. |

La evolución del producto refleja la transición del mercado desde gobierno de servicios y SOA tradicional hacia **gestión integral del ciclo de vida de APIs**, multicloud, seguridad y observabilidad.

## 4. Características principales

Akana se presenta actualmente como una plataforma empresarial de administración de APIs de ciclo de vida completo. Entre sus capacidades documentadas están:

- diseño, publicación y administración de APIs;
- API Gateway con routing, mediación y enforcement de políticas;
- autenticación, autorización y políticas de seguridad;
- rate limiting, control de tráfico y SLAs;
- portal/marketplace para consumidores y desarrolladores;
- contratos entre aplicaciones y APIs;
- monitoreo, métricas, analytics y alertas;
- lifecycle governance y aprobaciones;
- soporte para despliegues on-premises, cloud, multicloud e híbridos;
- soporte para REST, SOAP y GraphQL;
- mediación entre protocolos y formatos, por ejemplo SOAP/REST y XML/JSON;
- integración con OAuth, OpenID Connect y SAML;
- clustering de gateways para escalabilidad, balanceo y tolerancia a fallos.

## 5. Módulos de la plataforma

La documentación oficial de Akana identifica los siguientes productos/componentes principales:

### Deployment Platform

Es el runtime o infraestructura base sobre la que se ejecutan los productos Akana.

### Community Manager

Portal para publicar, descubrir y consumir APIs, incorporar partners/desarrolladores y gestionar comunidades, aplicaciones y contratos.

### API Gateway

Capa de intermediación entre aplicaciones y APIs. Incluye capacidades asociadas a **Policy Manager**, **Network Director** y Agents. Aplica seguridad, routing, mediación, políticas y control operacional.

### Lifecycle Manager

Automatiza validaciones, sign-offs y gobierno del ciclo de vida de activos y APIs.

### Envision

Plataforma de analytics para visualizar tendencias, consumo y datos capturados por API Management.

### Sola

Componente orientado a modernizar/exponer activos de mainframe como APIs modernas.

## 6. Componentes principales de una solución

Una instalación empresarial de Akana puede combinar:

1. **Policy Manager / control plane** para registrar y gobernar APIs, contratos y políticas.
2. **Network Director / API Gateway** como runtime de tráfico.
3. **Community Manager** como portal de desarrolladores y administración de APIs/apps.
4. **Base de datos** compatible para persistencia de configuración y metadatos.
5. **Elasticsearch** cuando se utiliza Community Manager para capacidades de búsqueda.
6. **Envision** para analytics/visualización cuando forma parte de la solución.
7. **Lifecycle Manager** para gobierno y aprobaciones avanzadas.
8. **Identity Provider** o sistemas IAM externos cuando se integran OAuth/OIDC/SAML.
9. **Load balancer** y clusters de gateways en topologías de alta disponibilidad.
10. **Backends empresariales**: REST, SOAP, GraphQL, sistemas legacy, mensajería u otros servicios.

## 7. Principales competidores

Gartner Peer Insights muestra como alternativas actuales consideradas por compradores de Akana, entre otras:

- Amazon API Gateway;
- Google Apigee API Management;
- WSO2 API Platform;
- MuleSoft Anypoint Platform;
- Microsoft Azure API Management;
- Axway Amplify Platform;
- Kong Gateway;
- Postman.

El **Magic Quadrant for API Management publicado el 28 de septiembre de 2026** evalúa 17 proveedores, entre ellos AWS, Axway, Boomi, Google, Gravitee, IBM, Kong, Microsoft, Postman, Salesforce/MuleSoft, SAP, Sensedia, SmartBear, Traefik Labs, Tyk, Workato y WSO2. **Akana no aparece entre los 17 proveedores evaluados en esa edición de 2026**, por lo que el cuadrante histórico mencionado en el enunciado debe tratarse como contexto de la asignación y no como evidencia de posicionamiento actual.

## 8. Hardware / appliance para una empresa con 500 usuarios

### Requisito oficial por contenedor

La documentación de **Akana Platform 2026.2.x** establece como mínimo recomendado por contenedor Akana:

- CPU de **2 GHz**;
- **dual core**;
- **4 GB RAM mínimo**;
- **6 GB RAM recomendado**;
- CPU dedicada por contenedor como supuesto de la recomendación;
- JRE 17 compatible en la línea 2026.2;
- Elasticsearch, cuando se usa Community Manager: referencia de **4 GB RAM y 25 GB de disco** para un servidor standalone, ampliable según uso.

### Escenario académico propuesto para 500 usuarios

Akana no publica una tabla que diga “500 usuarios = X servidores”. El dimensionamiento real depende de concurrencia, requests por segundo, número de APIs, payloads, políticas, analytics, disponibilidad y retención de logs. Para el caso académico se propone una topología **HA básica**, no certificada por el fabricante:

| Rol | Cantidad | Baseline académico por nodo |
|---|---:|---|
| Policy Manager / Community Manager | 2 | 4 vCPU, 8 GB RAM |
| API Gateway / Network Director | 2 | 4 vCPU, 8 GB RAM |
| Base de datos | 1 HA administrada o 2 nodos | 4 vCPU, 16 GB RAM, almacenamiento persistente |
| Elasticsearch | 1–2 | 4 vCPU, 8–16 GB RAM, 50+ GB disco |
| Load balancer | 1 servicio administrado o par HA | según proveedor |

Esta propuesta supera el mínimo oficial por contenedor para dejar margen operativo y soportar redundancia. Antes de producción se requerirían pruebas de carga y sizing con Akana Professional Services.

## 9. Elementos usuales de una solución SOA con Akana

Una solución típica puede incluir:

- APIs y versiones de APIs;
- aplicaciones consumidoras;
- contratos app/API;
- portal y catálogo de APIs;
- documentación interactiva;
- endpoints físicos y virtuales;
- API Gateway y clusters;
- políticas de seguridad, service-level y compliance;
- OAuth/OIDC/SAML e integración IAM;
- routing, transformación y mediación;
- deployment zones;
- workflows y aprobaciones;
- métricas, auditoría, alertas y analytics;
- roles, organizaciones, grupos y equipos;
- lifecycle management;
- integración de servicios REST/SOAP/GraphQL y sistemas legacy.

## 10. Costos aproximados para 500 usuarios

### Licenciamiento Akana

**No se encontró una lista pública vigente de precios de licencia o suscripción de Akana.** Perforce dirige al cliente a contacto comercial y ofrece una prueba SaaS de 30 días. Akana QuickStart publica un paquete inicial sugerido de **250 GB/mes de tráfico de Gateway**, pero no publica el precio monetario del paquete.

Por tanto, para una presentación académica responsable, el costo de licencia debe indicarse como:

> **Licencia / SaaS Akana: cotización comercial requerida. Precio público no disponible.**

No debe inventarse una cifra de licencia para “500 usuarios”, porque el fabricante comercializa la plataforma según el alcance y consumo de la solución, no mediante una tarifa pública simple por usuario encontrada en las fuentes revisadas.

### Infraestructura

El costo de infraestructura tampoco puede inferirse únicamente a partir de “500 usuarios”. Debe presupuestarse según la topología anterior y el proveedor elegido. Para la presentación se recomienda separar:

- cómputo de nodos Akana;
- base de datos;
- Elasticsearch;
- balanceador;
- almacenamiento y backups;
- transferencia de datos;
- monitoreo;
- soporte/professional services;
- licencia o suscripción Akana.

El resultado final debe presentarse como **estimación técnica**, no como cotización oficial de Perforce.

## 11. Aspectos adicionales relevantes

### Despliegue

Akana soporta escenarios on-premises, cloud e híbridos. La documentación también describe escenarios clusterizados y deployment zones para distribuir gateways por datacenter o región.

### Estrategia de releases

Perforce documenta dos cadencias:

- **STS (Short-Term Support):** releases trimestrales, orientadas a innovación, con soporte más corto.
- **LTS (Long-Term Support):** releases anuales orientadas a estabilidad y compatibilidad, con soporte extendido.

### Seguridad

El gateway puede actuar como capa de mediación y enforcement para autenticación, autorización, políticas, auditoría y transformación sin obligar a modificar cada backend.

### Relación con SOAForge

La demo NovaCommerce no intenta reproducir el producto Akana. Implementa tres servicios —Customer, Order y Payment— para demostrar de forma programada los conceptos que luego se mapearán a Akana: contratos, routing, gateway, políticas, seguridad, governance y observabilidad.

---

## Fuentes consultadas

1. IBM — What is SOA: https://www.ibm.com/think/topics/soa
2. IBM — Business Process Management overview: https://www.ibm.com/docs/en/baw/25.0.x?topic=overview-business-process-management
3. Akana — About / Our Story: https://www.akana.com/about
4. Akana — Rogue Wave acquires Akana (2016): https://www.akana.com/press-release/rogue-wave-acquires-api-management-leader-akana
5. Perforce — Acquisition of Rogue Wave (2019): https://www.perforce.com/press-releases/clearlake-capital-backed-perforce-software-acquire-rogue-wave-software
6. Akana Documentation — Home / primary components: https://help.akana.com/
7. Akana Documentation — System Requirements: https://help.akana.com/content/current/sp/system_requirements/system_requirements_akana_platform.htm
8. Akana Documentation — Managing API Gateways: https://help.akana.com/content/current/cm/learnmore/bus_admin_gateways.htm
9. Akana Documentation — API Platform API Overview: https://help.akana.com/content/current/cm/api/
10. Perforce Akana — API Platform: https://www.perforce.com/products/akana/api-platform
11. Perforce Akana — API Gateway: https://www.perforce.com/products/akana/api-platform/api-gateway
12. Perforce Akana — QuickStart: https://www.perforce.com/products/akana/quickstart
13. Gartner Peer Insights — Akana alternatives: https://www.gartner.com/reviews/product/akana-api-management-platform/alternatives
14. Gartner — Magic Quadrant for API Management, 28 Sep 2026: https://www.gartner.com/en/documents/8428713

## Conclusión

Akana evolucionó desde raíces de SOA y web services hacia una plataforma empresarial de API management de ciclo de vida completo. Su propuesta actual combina control plane, gateway, portal, lifecycle, analytics y capacidades de modernización. Para el caso académico de ISO-810, el valor de SOAForge será conectar esta investigación con una demo propia y verificable, sin presentar la demo como sustituto del producto comercial.
