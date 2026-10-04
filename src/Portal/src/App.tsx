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
};

const gatewayUrl = import.meta.env.VITE_GATEWAY_URL ?? 'http://localhost:5100';

const services: ServiceDefinition[] = [
  {
    name: 'CustomerService',
    route: '/api/v1/customers',
    openApi: 'http://localhost:5101/openapi/v1.json',
    responsibility: 'Clientes y consulta de identidad comercial.',
  },
  {
    name: 'OrderService',
    route: '/api/v1/orders',
    openApi: 'http://localhost:5102/openapi/v1.json',
    responsibility: 'Órdenes y validación remota del cliente.',
  },
  {
    name: 'PaymentService',
    route: '/api/v1/payments',
    openApi: 'http://localhost:5103/openapi/v1.json',
    responsibility: 'Pagos y validación remota de la orden.',
  },
];

function App() {
  const [health, setHealth] = useState<HealthSummary | null>(null);
  const [metrics, setMetrics] = useState<MetricsSnapshot | null>(null);
  const [statusMessage, setStatusMessage] = useState('Conectando con el Gateway…');
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('SOAForge2026!');
  const [token, setToken] = useState<TokenResponse | null>(null);
  const [authError, setAuthError] = useState('');

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

  return (
    <main className="shell">
      <header className="hero">
        <div>
          <span className="eyebrow">UNAPEC · ISO-810 · AKANA SOA</span>
          <h1>SOAForge Service Portal</h1>
          <p>
            Catálogo, estado operativo, seguridad y observabilidad del laboratorio NovaCommerce.
          </p>
        </div>
        <div className={`overall-status ${health?.isHealthy ? 'healthy' : 'warning'}`}>
          <span className="status-dot" />
          {health?.isHealthy ? 'Healthy' : 'Check services'}
        </div>
      </header>

      <section className="summary-grid">
        <article className="metric-card">
          <span>Gateway</span>
          <strong>YARP · :5100</strong>
          <small>Entrada única versionada</small>
        </article>
        <article className="metric-card">
          <span>Requests</span>
          <strong>{metrics?.totalRequests ?? '—'}</strong>
          <small>Desde el inicio del Gateway</small>
        </article>
        <article className="metric-card">
          <span>Failures</span>
          <strong>{metrics?.failedRequests ?? '—'}</strong>
          <small>HTTP 4xx / 5xx observados</small>
        </article>
        <article className="metric-card">
          <span>Avg. latency</span>
          <strong>{metrics ? `${metrics.averageDurationMs} ms` : '—'}</strong>
          <small>Promedio en el borde</small>
        </article>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">OPERATIONS</span>
            <h2>Service health</h2>
          </div>
          <button className="secondary-button" onClick={() => void refreshObservability()}>
            Actualizar
          </button>
        </div>
        <p className="muted">{statusMessage}</p>
        <div className="health-grid">
          {services.map((service) => {
            const state = health?.services.find((item) => item.name === service.name);
            return (
              <article className="health-card" key={service.name}>
                <div className="health-title">
                  <h3>{service.name}</h3>
                  <span className={`pill ${state?.status === 'Healthy' ? 'ok' : 'down'}`}>
                    {state?.status ?? 'Unknown'}
                  </span>
                </div>
                <p>{service.responsibility}</p>
                <dl>
                  <div><dt>Status</dt><dd>{state?.statusCode ?? '—'}</dd></div>
                  <div><dt>Latency</dt><dd>{state ? `${state.durationMs} ms` : '—'}</dd></div>
                </dl>
                {state?.error && <p className="error-text">{state.error}</p>}
              </article>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div>
            <span className="eyebrow">CATALOG</span>
            <h2>Versioned service contracts</h2>
          </div>
        </div>
        <div className="catalog-table">
          {services.map((service) => (
            <div className="catalog-row" key={service.name}>
              <div>
                <strong>{service.name}</strong>
                <span>{service.responsibility}</span>
              </div>
              <code>{service.route}</code>
              <a href={service.openApi} target="_blank" rel="noreferrer">OpenAPI</a>
            </div>
          ))}
        </div>
      </section>

      <section className="two-column">
        <article className="panel">
          <span className="eyebrow">SECURITY</span>
          <h2>JWT demo access</h2>
          <form className="auth-form" onSubmit={requestToken}>
            <label>
              Usuario
              <input value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
              Contraseña
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button className="primary-button" type="submit">Obtener token</button>
          </form>
          {authError && <p className="error-text">{authError}</p>}
          {token && (
            <div className="token-box">
              <span>Bearer · role {token.role}</span>
              <code>{`${token.accessToken.slice(0, 64)}…`}</code>
              <small>Expira: {new Date(token.expiresAtUtc).toLocaleString()}</small>
            </div>
          )}
        </article>

        <article className="panel">
          <span className="eyebrow">GOVERNANCE</span>
          <h2>Policies at the edge</h2>
          <ul className="policy-list">
            <li>JWT validation before upstream access</li>
            <li>60 requests/minute fixed-window limit</li>
            <li>Versioned `/api/v1/*` routes</li>
            <li>Correlation and trace headers</li>
            <li>Structured audit-style request logs</li>
            <li>Central service health aggregation</li>
          </ul>
        </article>
      </section>

      <footer>
        <span>SOAForge · Enterprise Application Integration Lab</span>
        <span>Gateway API: {gatewayUrl}</span>
      </footer>
    </main>
  );
}

export default App;
