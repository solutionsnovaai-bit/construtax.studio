/* ============================================================
   CONSTRUTAX STUDIO — ROOT APP (React entry point)
   ============================================================ */

/* ── Page transition wrapper ── */
function PageTransition({ children, viewKey }) {
  const { useState, useEffect, useRef } = React;
  const [visible, setVisible] = useState(false);
  const prevKey = useRef(viewKey);

  useEffect(() => {
    if (prevKey.current !== viewKey) {
      setVisible(false);
      const t = setTimeout(() => { setVisible(true); prevKey.current = viewKey; }, 140);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => setVisible(true), 60);
      return () => clearTimeout(t);
    }
  }, [viewKey]);

  return (
    <div style={{
      opacity:   visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(12px)',
      transition:'opacity 0.32s ease, transform 0.32s ease',
      minHeight: '100%',
    }}>
      {children}
    </div>
  );
}

/* ── Root App ── */
function App() {
  const { useState, useEffect } = React;

  const [loaded, setLoaded] = useState(false);
  const [view,   setView]   = useState('dashboard');
  const [theme,  setTheme]  = useState(() => localStorage.getItem('ctax-theme') || 'dark');

  /* Apply theme */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ctax-theme', theme);
  }, [theme]);

  /* Init canvas */
  useEffect(() => {
    if (!loaded) return;
    const canvas = document.getElementById('bg-canvas');
    if (canvas && window.initAtmosphericCanvas) window.initAtmosphericCanvas(canvas);
  }, [loaded]);

  /* GSAP view animations */
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => {
      if (window.initViewAnimations) window.initViewAnimations(view);
    }, 320);
    return () => clearTimeout(t);
  }, [view, loaded]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const navigate = v => {
    setView(v);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard onNavigate={navigate} />;
      case 'calendar':  return <Calendar />;
      case 'assistant': return <Assistant />;
      case 'tasks':     return <Tasks />;
      default:          return <Dashboard onNavigate={navigate} />;
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard',  Icon: window.IconDashboard },
    { id: 'calendar',  label: 'Calendário', Icon: window.IconCalendar  },
    { id: 'assistant', label: 'IA',         Icon: window.IconAssistant },
    { id: 'tasks',     label: 'Lembretes',  Icon: window.IconTasks     },
  ];

  const isDark = theme === 'dark';

  return (
    <>
      {/* Canvas background */}
      <canvas id="bg-canvas" />

      {/* Load screen */}
      {!loaded && <LoadScreen onComplete={() => setLoaded(true)} />}

      {/* ── Mobile top bar ── */}
      {loaded && (
        <header className="mobile-top-bar">
          <img
            key={isDark ? 'dark' : 'light'}
            src={isDark ? 'assets/logo-dark.png' : 'assets/logo-light.png'}
            alt="CONSTRUTAX"
            style={{ height: 26, width: 'auto' }}
          />
          <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            style={{
              position: 'absolute', right: 14,
              background: 'none', border: 'none',
              color: 'var(--text-muted)', cursor: 'pointer',
              padding: 10, display: 'flex', alignItems: 'center',
              borderRadius: 8,
            }}
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M9 1.5v2M9 14.5v2M1.5 9h2M14.5 9h2M3.6 3.6l1.4 1.4M13 13l1.4 1.4M3.6 14.4l1.4-1.4M13 5l1.4-1.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M15.5 10A7 7 0 1 1 8 2.5c0 0 2.5.5 3.5 2.5s4 5 4 5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </header>
      )}

      {/* App shell */}
      <div className="app-shell app-visible">
        <Sidebar
          view={view}
          onNavigate={navigate}
          theme={theme}
          onToggleTheme={toggleTheme}
          mobileOpen={false}
        />
        <main className="content-area">
          <PageTransition viewKey={view}>
            {renderView()}
          </PageTransition>
        </main>
      </div>

      {/* ── Bottom navigation (mobile only) ── */}
      {loaded && (
        <nav className="bottom-nav">
          <div className="bottom-nav-inner">
            {navItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                className={`bottom-nav-item${view === id ? ' active' : ''}`}
                onClick={() => navigate(id)}
                aria-label={label}
              >
                {Icon && <Icon active={view === id} />}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}

/* ── Mount ── */
const rootEl    = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(rootEl);
reactRoot.render(React.createElement(App));
