import { FormEvent, useEffect, useState } from 'react';

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
};

const gatewayUrl = import.meta.env.VITE_GATEWAY_URL ?? 'http://localhost:5100';

const services: ServiceDefinition[] = [
  {
    name: 'CustomerService',
    route: '/api/v1/customers',
    openApi: 'http://localhost:5101/openapi/v1.json',
    responsibility: 'Clientes y consulta de identidad comercial.',
    icon: 'fa-users',
  },
  {
    name: 'OrderService',
    route: '/api/v1/orders',
    openApi: 'http://localhost:5102/openapi/v1.json',
    responsibility: 'Órdenes y validación remota del cliente.',
    icon: 'fa-cart-shopping',
  },
  {
    name: 'PaymentService',
    route: '/api/v1/payments',
    openApi: 'http://localhost:5103/openapi/v1.json',
    responsibility: 'Pagos y validación remota de la orden.',
    icon: 'fa-credit-card',
  },
];

const policies = [
  { icon: 'fa-shield-halved', text: 'JWT validation before upstream access' },
  { icon: 'fa-gauge-high', text: '60 requests/minute fixed-window limit' },
  { icon: 'fa-code', text: 'Versioned /api/v1/* routes' },
  { icon: 'fa-link', text: 'Correlation and trace headers' },
  { icon: 'fa-file-lines', text: 'Structured audit-style request logs' },
  { icon: 'fa-heart-pulse', text: 'Central service health aggregation' },
];

function FaIcon({ name, className = '' }: { name: string; className?: string }) {
  return <i className={`fa-solid ${name} ${className}`.trim()} aria-hidden="true" />;
}

function App() {
  const [health, setHealth] = useState<HealthSummary | null>(null);
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const [statusMessage, setStatusMessage] = useState('Conectando con el Gateway…');
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('SOAForge2026!');
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [authError, setAuthError] = useState('');
  const [copied, setCopied] = useState(false);

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

  return (
    <main className="shell">
      <header className="hero">
        <div className="hero-copy">
          <span className="eyebrow">UNAPEC · ISO-810 · AKANA SOA</span>
          <h1>SOAForge Service Portal</h1>
          <p>
            Catálogo, estado operativo, seguridad y observabilidad del laboratorio NovaCommerce.
          </p>
        </div>
        <div className={`overall-status ${health?.isHealthy ? 'healthy' : 'warning'}`}>
          <FaIcon name={health?.isHealthy ? 'fa-circle-check' : 'fa-circle-exclamation'} />
          <span>{health?.isHealthy ? 'Healthy' : 'Check services'}</span>
        </div>
      </header>

      <section className="summary-grid" aria-label="Resumen del Gateway">
        <article className="metric-card">
          <span className="metric-icon blue"><FaIcon name="fa-server" /></span>
          <div className="metric-content">
            <span>Gateway</span>
            <strong>YARP · :5100</strong>
            <small>Entrada única versionada</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon cyan"><FaIcon name="fa-chart-line" /></span>
          <div className="metric-content">
            <span>Requests</span>
            <strong>{metrics?.totalRequests ?? '—'}</strong>
            <small>Desde el inicio del Gateway</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon amber"><FaIcon name="fa-triangle-exclamation" /></span>
          <div className="metric-content">
            <span>Failures</span>
            <strong>{metrics?.failedRequests ?? '—'}</strong>
            <small>HTTP 4xx / 5xx observados</small>
          </div>
        </article>
        <article className="metric-card">
          <span className="metric-icon violet"><FaIcon name="fa-clock" /></span>
          <div className="metric-content">
            <span>Avg. latency</span>
            <strong>{metrics ? `${metrics.averageDurationMs} ms` : '—'}</strong>
            <small>Promedio en el borde</small>
          </div>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div className="section-title">
            <span className="section-icon"><FaIcon name="fa-heart-pulse" /></span>
            <div>
              <span className="eyebrow">OPERATIONS</span>
              <h2>Service health</h2>
            </div>
          </div>
          <button className="secondary-button" type="button" onClick={() => void refreshObservability()}>
            <FaIcon name="fa-rotate" />
            <span>Actualizar</span>
          </button>
        </div>
        <p className="muted">{statusMessage}</p>
        <div className="health-grid">
          {services.map((service) => {
            const state = health?.services.find((item) => item.name === service.name);
            const isHealthy = state?.status === 'Healthy';

            return (
              <article className="health-card" key={service.name}>
                <div className="health-title">
                  <div className="service-name">
                    <span className="service-icon"><FaIcon name={service.icon} /></span>
                    <h3>{service.name}</h3>
                  </div>
                  <span className={`pill ${isHealthy ? 'ok' : 'down'}`}>
                    <FaIcon name={isHealthy ? 'fa-circle-check' : 'fa-circle-exclamation'} />
                    {state?.status ?? 'Unknown'}
                  </span>
                </div>
                <p>{service.responsibility}</p>
                <dl>
                  <div>
                    <dt><FaIcon name="fa-signal" /> Status</dt>
                    <dd>{state?.statusCode ?? '—'}</dd>
                  </div>
                  <div>
                    <dt><FaIcon name="fa-stopwatch" /> Latency</dt>
                    <dd>{state ? `${state.durationMs} ms` : '—'}</dd>
                  </div>
                </dl>
                {state?.error && <p className="error-text">{state.error}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div className="section-title">
            <span className="section-icon"><FaIcon name="fa-layer-group" /></span>
            <div>
              <span className="eyebrow">CATALOG</span>
              <h2>Versioned service contracts</h2>
            </div>
          </div>
        </div>
        <div className="catalog-table">
          {services.map((service) => (
            <div className="catalog-row" key={service.name}>
              <div className="catalog-service">
                <span className="service-icon compact"><FaIcon name={service.icon} /></span>
                <div>
                  <strong>{service.name}</strong>
                  <span>{service.responsibility}</span>
                </div>
              </div>
              <code>{service.route}</code>
              <a className="openapi-link" href={service.openApi} target="_blank" rel="noreferrer">
                <span>OpenAPI</span>
                <FaIcon name="fa-arrow-up-right-from-square" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="two-column">
        <article className="panel auth-panel">
          <div className="section-title">
            <span className="section-icon amber"><FaIcon name="fa-key" /></span>
            <div>
              <span className="eyebrow">SECURITY</span>
              <h2>JWT demo access</h2>
            </div>
          </div>
          <form className="auth-form" onSubmit={requestToken}>
            <label>
              <span><FaIcon name="fa-user" /> Usuario</span>
              <input value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
              <span><FaIcon name="fa-lock" /> Contraseña</span>
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button className="primary-button" type="submit">
              <FaIcon name="fa-key" />
              <span>Obtener token</span>
            </button>
          </form>
          {authError && <p className="error-text">{authError}</p>}
          {token && (
            <div className="token-box">
              <div className="token-heading">
                <span><FaIcon name="fa-shield-halved" /> Bearer · role {token.role}</span>
                <button type="button" className="icon-button" onClick={() => void copyToken()} aria-label="Copiar token">
                  <FaIcon name={copied ? 'fa-check' : 'fa-copy'} />
                </button>
              </div>
              <code>{`${token.accessToken.slice(0, 64)}…`}</code>
              <small>{copied ? 'Token copiado al portapapeles.' : `Expira: ${new Date(token.expiresAtUtc).toLocaleString()}`}</small>
            </div>
          )}
        </article>

        <article className="panel governance-panel">
          <div className="section-title">
            <span className="section-icon green"><FaIcon name="fa-shield-halved" /></span>
            <div>
              <span className="eyebrow">GOVERNANCE</span>
              <h2>Policies at the edge</h2>
            </div>
          </div>
          <ul className="policy-list">
            {policies.map((policy) => (
              <li key={policy.text}>
                <span className="policy-icon"><FaIcon name={policy.icon} /></span>
                <span>{policy.text}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <footer>
        <span><FaIcon name="fa-network-wired" /> SOAForge · Enterprise Application Integration Lab</span>
        <span><FaIcon name="fa-plug" /> Gateway API: {gatewayUrl}</span>
      </footer>
    </main>
  );
}

export default App;
