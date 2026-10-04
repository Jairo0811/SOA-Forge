import { FormEvent, useEffect, useRef, useState } from 'react';

type HealthItem = {
  name: string;
  status: string;
  statusCode: number | null;
  durationMs: number;
  error: string | null;
};

type HealthSummary = {
  isHealthy: boolean;
  checkedAtUtc: string;
  services: HealthItem[];
};

type MetricsSnapshot = {
  totalRequests: number;
  failedRequests: number;
  averageDurationMs: number;
  startedAtUtc: string;
};

type MetricPoint = {
  label: string;
  requests: number;
  failures: number;
};

type TokenResponse = {
  accessToken: string;
  tokenType: string;
  expiresAtUtc: string;
  role: string;
};

type ServiceDefinition = {
  name: string;
  route: string;
  openApi: string;
  responsibility: string;
  icon: string;
  accent: string;
};

type NavItem = {
  label: string;
  icon: string;
  href: string;
};

const gatewayUrl = import.meta.env.VITE_GATEWAY_URL ?? 'http://localhost:5100';

const services: ServiceDefinition[] = [
  {
    name: 'CustomerService',
    route: '/api/v1/customers',
    openApi: 'http://localhost:5101/openapi/v1.json',
    responsibility: 'Clientes y consulta de identidad comercial.',
    icon: 'fa-users',
    accent: 'violet',
  },
  {
    name: 'OrderService',
    route: '/api/v1/orders',
    openApi: 'http://localhost:5102/openapi/v1.json',
    responsibility: 'Órdenes y validación remota del cliente.',
    icon: 'fa-cart-shopping',
    accent: 'amber',
  },
  {
    name: 'PaymentService',
    route: '/api/v1/payments',
    openApi: 'http://localhost:5103/openapi/v1.json',
    responsibility: 'Pagos y validación remota de la orden.',
    icon: 'fa-credit-card',
    accent: 'purple',
  },
];

const navItems: NavItem[] = [
  { label: 'Inicio', icon: 'fa-house', href: '#inicio' },
  { label: 'Catálogo de Servicios', icon: 'fa-database', href: '#catalogo' },
  { label: 'Observabilidad', icon: 'fa-chart-line', href: '#observabilidad' },
  { label: 'Seguridad', icon: 'fa-shield-halved', href: '#seguridad' },
  { label: 'Gobernanza', icon: 'fa-gears', href: '#gobernanza' },
  { label: 'Documentación', icon: 'fa-file-lines', href: '#catalogo' },
];

const policies = [
  { icon: 'fa-shield-halved', text: 'JWT validation before upstream access', accent: 'blue' },
  { icon: 'fa-gauge-high', text: '60 requests/minute fixed-window limit', accent: 'amber' },
  { icon: 'fa-code', text: 'Versioned /api/v1/* routes', accent: 'violet' },
  { icon: 'fa-link', text: 'Correlation and trace headers', accent: 'cyan' },
  { icon: 'fa-file-lines', text: 'Structured audit-style request logs', accent: 'green' },
  { icon: 'fa-chart-column', text: 'Central service health aggregation', accent: 'blue' },
];

function FaIcon({ name, className = '' }: { name: string; className?: string }) {
  return <i className={`fa-solid ${name} ${className}`.trim()} aria-hidden="true" />;
}

function formatTime(value?: string) {
  if (!value) return 'Sin verificar';
  return new Intl.DateTimeFormat('es-DO', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(value));
}

function buildPolyline(points: MetricPoint[], key: 'requests' | 'failures') {
  if (!points.length) return '';
  const width = 600;
  const height = 176;
  const values = points.map((point) => point[key]);
  const maxValue = Math.max(...values, 1);

  return points
    .map((point, index) => {
      const x = points.length === 1 ? width : (index / (points.length - 1)) * width;
      const y = height - (point[key] / maxValue) * (height - 24) - 12;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
}

function App() {
  const [health, setHealth] = useState<HealthSummary | null>(null);
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const [history, setHistory] = useState<MetricPoint[]>([]);
  const [statusMessage, setStatusMessage] = useState('Conectando con el Gateway…');
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('SOAForge2026!');
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [authError, setAuthError] = useState('');
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const refreshObservability = async () => {
    try {
      const [healthResponse, metricsResponse] = await Promise.all([
        fetch(`${gatewayUrl}/health/services`),
        fetch(`${gatewayUrl}/observability/metrics`),
      ]);

      const healthBody = (await healthResponse.json()) as HealthSummary;
      const metricsBody = (await metricsResponse.json()) as MetricsSnapshot;

      setHealth(healthBody);
      setMetrics(metricsBody);
      setHistory((current) => {
        const nextPoint: MetricPoint = {
          label: new Intl.DateTimeFormat('es-DO', {
            hour: '2-digit',
            minute: '2-digit',
          }).format(new Date()),
          requests: metricsBody.totalRequests,
          failures: metricsBody.failedRequests,
        };
        return [...current, nextPoint].slice(-18);
      });
      setStatusMessage(
        healthBody.isHealthy
          ? 'Todos los servicios responden correctamente.'
          : 'El Gateway detectó al menos un servicio degradado.',
      );
    } catch {
      setStatusMessage('No fue posible conectar con SOAForge.Gateway en el puerto 5100.');
    }
  };

  useEffect(() => {
    void refreshObservability();
    const timer = window.setInterval(() => void refreshObservability(), 10000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const requestToken = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthError('');
    setCopied(false);

    try {
      const response = await fetch(`${gatewayUrl}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setToken(null);
        setAuthError('Credenciales rechazadas por el Gateway.');
        return;
      }

      setToken((await response.json()) as TokenResponse);
    } catch {
      setToken(null);
      setAuthError('No fue posible solicitar el JWT.');
    }
  };

  const copyToken = async () => {
    if (!token) return;

    try {
      await navigator.clipboard.writeText(token.accessToken);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const requestPolyline = buildPolyline(history, 'requests');
  const failurePolyline = buildPolyline(history, 'failures');
  const allHealthy = health?.isHealthy === true;

  return (
    <div className="app-shell" id="inicio">
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="brand">
          <span className="brand-mark"><FaIcon name="fa-cube" /></span>
          <div>
            <strong>SOAForge</strong>
            <span>Service Portal</span>
          </div>
        </div>

        <nav className="sidebar-nav" aria-label="Navegación principal">
          {navItems.map((item, index) => (
            <a
              className={index === 0 ? 'active' : ''}
              href={item.href}
              key={item.label}
              onClick={() => setMenuOpen(false)}
            >
              <FaIcon name={item.icon} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="environment-card">
          <span>Entorno</span>
          <strong><i className="status-led" /> Gateway Local</strong>
          <small>{gatewayUrl}</small>
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button
            className="mobile-menu"
            type="button"
            aria-label="Abrir navegación"
            onClick={() => setMenuOpen((current) => !current)}
          >
            <FaIcon name={menuOpen ? 'fa-xmark' : 'fa-bars'} />
          </button>

          <label className="global-search">
            <FaIcon name="fa-magnifying-glass" />
            <input
              ref={searchRef}
              type="search"
              placeholder="Buscar servicios, endpoints o documentación…"
              aria-label="Buscar en SOAForge"
            />
            <kbd>Ctrl K</kbd>
          </label>

          <div className="topbar-actions">
            <button className="ghost-icon" type="button" aria-label="Cambiar tema"><FaIcon name="fa-sun" /></button>
            <button className="ghost-icon notification" type="button" aria-label="Notificaciones"><FaIcon name="fa-bell" /></button>
            <div className="user-chip">
              <span className="avatar"><FaIcon name="fa-user" /></span>
              <div>
                <strong>demo</strong>
                <span>Rol: operator</span>
              </div>
              <FaIcon name="fa-chevron-down" />
            </div>
          </div>
        </header>

        <main className="dashboard">
          <section className="hero-panel">
            <div className="hero-copy">
              <span className="eyebrow">UNAPEC · ISO-810 · AKANA SOA</span>
              <h1>SOAForge <span>Service Portal</span></h1>
              <p>Catálogo, estado operativo, seguridad y observabilidad del laboratorio NovaCommerce.</p>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="server-stack one"><FaIcon name="fa-server" /></div>
              <div className="server-stack two"><FaIcon name="fa-server" /></div>
              <div className="network-line a" />
              <div className="network-line b" />
            </div>

            <div className="hero-meta">
              <div>
                <strong>Plataforma de Integración</strong>
                <span>APIs · Seguridad · Observabilidad</span>
              </div>
              <div className={`global-health ${allHealthy ? 'healthy' : 'warning'}`}>
                <span className="health-orb" />
                <div>
                  <strong>{allHealthy ? 'Healthy' : 'Check services'}</strong>
                  <span>{allHealthy ? 'Todos los sistemas operativos' : 'Revisar servicios'}</span>
                </div>
              </div>
            </div>
          </section>

          <section className="kpi-grid" aria-label="Resumen del Gateway">
            <article className="kpi-card">
              <span className="kpi-icon blue"><FaIcon name="fa-server" /></span>
              <div>
                <span className="kpi-label">Gateway</span>
                <strong>YARP · :5100</strong>
                <small>Entrada única versionada</small>
              </div>
            </article>
            <article className="kpi-card">
              <span className="kpi-icon cyan"><FaIcon name="fa-chart-column" /></span>
              <div>
                <span className="kpi-label">Total requests</span>
                <strong>{metrics?.totalRequests ?? '—'}</strong>
                <small>Desde el inicio del Gateway</small>
              </div>
              <span className="live-chip"><FaIcon name="fa-arrow-trend-up" /> Live</span>
            </article>
            <article className="kpi-card">
              <span className="kpi-icon amber"><FaIcon name="fa-triangle-exclamation" /></span>
              <div>
                <span className="kpi-label">Failures</span>
                <strong>{metrics?.failedRequests ?? '—'}</strong>
                <small>HTTP 4xx / 5xx observados</small>
              </div>
            </article>
            <article className="kpi-card">
              <span className="kpi-icon blue"><FaIcon name="fa-clock" /></span>
              <div>
                <span className="kpi-label">Avg. latency</span>
                <strong>{metrics ? `${metrics.averageDurationMs} ms` : '—'}</strong>
                <small>Promedio en el borde</small>
              </div>
            </article>
            <article className="kpi-card">
              <span className="kpi-icon green"><FaIcon name="fa-shield-halved" /></span>
              <div>
                <span className="kpi-label">Policies actives</span>
                <strong>{policies.length}</strong>
                <small>En el Gateway</small>
              </div>
            </article>
          </section>

          <section className="operations-grid">
            <article className="panel service-panel">
              <div className="panel-heading">
                <div className="section-title">
                  <span className="section-icon cyan"><FaIcon name="fa-heart-pulse" /></span>
                  <div>
                    <h2>Service Health</h2>
                    <p>{statusMessage}</p>
                  </div>
                </div>
                <div className="refresh-area">
                  <button className="secondary-button" type="button" onClick={() => void refreshObservability()}>
                    <FaIcon name="fa-rotate" /> Actualizar
                  </button>
                  <small>Última verificación: {formatTime(health?.checkedAtUtc)}</small>
                </div>
              </div>

              <div className="health-grid">
                {services.map((service) => {
                  const state = health?.services.find((item) => item.name === service.name);
                  const isHealthy = state?.status === 'Healthy';

                  return (
                    <article className="health-card" key={service.name}>
                      <div className="health-title">
                        <div className="service-name">
                          <span className={`service-icon ${service.accent}`}><FaIcon name={service.icon} /></span>
                          <h3>{service.name}</h3>
                        </div>
                        <span className={`pill ${isHealthy ? 'ok' : 'down'}`}>
                          {state?.status ?? 'Unknown'}
                        </span>
                      </div>
                      <p>{service.responsibility}</p>
                      <div className="health-stats">
                        <div>
                          <span>Status</span>
                          <strong><i className={`status-led ${isHealthy ? '' : 'warning'}`} /> HTTP {state?.statusCode ?? '—'}</strong>
                        </div>
                        <div>
                          <span>Latency</span>
                          <strong><FaIcon name="fa-clock" /> {state ? `${state.durationMs} ms` : '—'}</strong>
                        </div>
                      </div>
                      {state?.error && <p className="error-text">{state.error}</p>}
                    </article>
                  );
                })}
              </div>
            </article>

            <article className="panel observability-panel" id="observabilidad">
              <div className="panel-heading compact">
                <div className="section-title">
                  <span className="section-icon cyan"><FaIcon name="fa-chart-column" /></span>
                  <div>
                    <h2>Observabilidad</h2>
                    <p>Tráfico del Gateway · actualización cada 10 s</p>
                  </div>
                </div>
                <span className="period-chip">Últimos {Math.max(history.length, 1)} puntos <FaIcon name="fa-chevron-down" /></span>
              </div>

              <div className="chart-wrap" aria-label="Historial reciente de requests y failures">
                <div className="chart-grid-lines" />
                {history.length > 1 ? (
                  <svg viewBox="0 0 600 176" preserveAspectRatio="none" role="img" aria-label="Requests y failures del Gateway">
                    <defs>
                      <linearGradient id="requestFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#29a8ff" stopOpacity="0.34" />
                        <stop offset="100%" stopColor="#29a8ff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <polyline className="chart-line requests" points={requestPolyline} />
                    <polyline className="chart-line failures" points={failurePolyline} />
                  </svg>
                ) : (
                  <div className="chart-empty">
                    <FaIcon name="fa-wave-square" />
                    <span>Recolectando historial…</span>
                  </div>
                )}
              </div>

              <div className="chart-footer">
                <div className="legend">
                  <span><i className="legend-dot requests" /> Requests</span>
                  <span><i className="legend-dot failures" /> Failures</span>
                </div>
                <div className="chart-totals">
                  <div><strong>{metrics?.totalRequests ?? '—'}</strong><span>Requests</span></div>
                  <div><strong className="failure-number">{metrics?.failedRequests ?? '—'}</strong><span>Failures</span></div>
                </div>
              </div>
            </article>
          </section>

          <section className="bottom-grid">
            <article className="panel contracts-panel" id="catalogo">
              <div className="section-title panel-title">
                <span className="section-icon blue"><FaIcon name="fa-database" /></span>
                <div>
                  <h2>Versioned Service Contracts</h2>
                  <p>Catálogo de servicios disponibles en el Gateway.</p>
                </div>
              </div>

              <div className="catalog-head" aria-hidden="true">
                <span>Servicio</span><span>Descripción</span><span>Ruta (v1)</span><span>Especificación</span>
              </div>
              <div className="catalog-table">
                {services.map((service) => (
                  <div className="catalog-row" key={service.name}>
                    <div className="catalog-service">
                      <span className={`service-icon compact ${service.accent}`}><FaIcon name={service.icon} /></span>
                      <strong>{service.name}</strong>
                    </div>
                    <span className="catalog-description">{service.responsibility}</span>
                    <code>{service.route}</code>
                    <a className="openapi-link" href={service.openApi} target="_blank" rel="noreferrer">
                      OpenAPI <FaIcon name="fa-arrow-up-right-from-square" />
                    </a>
                  </div>
                ))}
              </div>
            </article>

            <article className="panel auth-panel" id="seguridad">
              <div className="section-title panel-title">
                <span className="section-icon amber"><FaIcon name="fa-key" /></span>
                <div>
                  <h2>JWT Demo Access</h2>
                  <p>Obtén un token de acceso para probar los servicios.</p>
                </div>
              </div>

              <form className="auth-form" onSubmit={requestToken}>
                <div className="form-row">
                  <label>
                    Usuario
                    <span className="input-wrap"><FaIcon name="fa-user" /><input value={username} onChange={(event) => setUsername(event.target.value)} /></span>
                  </label>
                  <label>
                    Contraseña
                    <span className="input-wrap"><FaIcon name="fa-lock" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} /></span>
                  </label>
                </div>
                <button className="primary-button" type="submit"><FaIcon name="fa-key" /> Obtener token</button>
              </form>

              {authError && <p className="error-text">{authError}</p>}
              {token && (
                <div className="token-box">
                  <div>
                    <strong>Bearer · role {token.role}</strong>
                    <code>{`${token.accessToken.slice(0, 54)}…`}</code>
                    <small>{copied ? 'Token copiado al portapapeles.' : `Expira: ${new Date(token.expiresAtUtc).toLocaleString()}`}</small>
                  </div>
                  <button type="button" className="copy-button" onClick={() => void copyToken()} aria-label="Copiar token">
                    <FaIcon name={copied ? 'fa-check' : 'fa-copy'} />
                  </button>
                </div>
              )}
            </article>

            <article className="panel governance-panel" id="gobernanza">
              <div className="section-title panel-title">
                <span className="section-icon green"><FaIcon name="fa-shield-halved" /></span>
                <div>
                  <h2>Policies at the Edge</h2>
                  <p>Políticas y controles de seguridad implementados.</p>
                </div>
              </div>
              <ul className="policy-list">
                {policies.map((policy) => (
                  <li key={policy.text}>
                    <span className={`policy-icon ${policy.accent}`}><FaIcon name={policy.icon} /></span>
                    <span>{policy.text}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <footer className="dashboard-footer">
            <span>SOAForge · Enterprise Application Integration Lab</span>
            <span>Gateway API: <a href={gatewayUrl} target="_blank" rel="noreferrer">{gatewayUrl} <FaIcon name="fa-arrow-up-right-from-square" /></a></span>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
