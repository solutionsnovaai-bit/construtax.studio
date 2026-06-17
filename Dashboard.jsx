/* ============================================================
   CONSTRUTAX STUDIO — DASHBOARD VIEW
   ============================================================ */

/* ── Animated counter hook ── */
function useCounter(target, duration, active) {
  const { useState, useEffect, useRef } = React;
  const [val, setVal] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    let start = null;
    function animate(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(parseFloat((eased * target).toFixed(target % 1 !== 0 ? 1 : 0)));
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration, active]);

  return val;
}

/* ── Reveal hook (IntersectionObserver) ── */
function useReveal(ref) {
  const { useState, useEffect } = React;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return visible;
}

/* ── SVG Icons for metrics ── */
function MetricIcon({ type }) {
  const color = 'var(--text-accent)';
  if (type === 0) return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="2" y="2" width="5.5" height="5.5" rx="1.2" stroke={color} strokeWidth="1.5"/>
      <rect x="10.5" y="2" width="5.5" height="5.5" rx="1.2" stroke={color} strokeWidth="1.5"/>
      <rect x="2" y="10.5" width="5.5" height="5.5" rx="1.2" stroke={color} strokeWidth="1.5"/>
      <rect x="10.5" y="10.5" width="5.5" height="5.5" rx="1.2" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
  if (type === 1) return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 10l3-3 3 2 3-4 3 3" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="2" y="2" width="14" height="14" rx="2" stroke={color} strokeWidth="1.5"/>
    </svg>
  );
  if (type === 2) return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="8" r="4" stroke={color} strokeWidth="1.5"/>
      <path d="M3 16c0-2.5 2.7-4 6-4s6 1.5 6 4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M3 14l3.5-5 3 3 2.5-4L16 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="4" r="1.5" fill={color}/>
    </svg>
  );
}

/* ── Metric Card ── */
function MetricCard({ metric, index, visible }) {
  const target = metric.value;
  const count  = useCounter(target, 1400, visible);
  const display = metric.suffix === '%'
    ? count.toFixed(1)
    : Math.round(count).toString();

  return (
    <div
      className={`metric-card reveal reveal-delay-${index + 1}${visible ? ' visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="metric-icon"><MetricIcon type={index} /></div>
      <div className="metric-value">
        {display}<span className="unit">{metric.suffix || ''}</span>
      </div>
      <div className="metric-label">{metric.label}</div>
      <div className="metric-trend">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M2 7l3-4 3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {metric.trend}
      </div>
    </div>
  );
}

/* ── Activity Chart (SVG smooth line) ── */
function ActivityChart({ data, visible }) {
  const pathRef = React.useRef(null);
  const W = 600, H = 110, PAD = 10;

  const max = Math.max(...(data || [0]));
  const min = Math.min(...(data || [0]));
  const isEmpty = max === 0 && min === 0;

  // ── Empty state ──────────────────────────────────────────
  if (isEmpty) {
    return (
      <div style={{
        height: 110, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 10,
        borderRadius: 'var(--radius-md)',
        background: 'rgba(65,111,64,0.04)',
        border: '1px dashed rgba(65,111,64,0.18)',
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Os dados aparecem conforme você publica
        </div>
        <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end' }}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} style={{
              width: 3,
              height: 3 + Math.abs(Math.sin(i * 0.9)) * 6,
              background: 'rgba(65,111,64,0.18)',
              borderRadius: 2,
            }} />
          ))}
        </div>
      </div>
    );
  }

  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: H - PAD - ((v - min) / range) * (H - PAD * 2),
  }));

  let line = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const cpx = (pts[i-1].x + pts[i].x) / 2;
    line += ` C ${cpx} ${pts[i-1].y} ${cpx} ${pts[i].y} ${pts[i].x} ${pts[i].y}`;
  }
  const area = `${line} L ${pts[pts.length-1].x} ${H} L ${pts[0].x} ${H} Z`;

  React.useEffect(() => {
    const el = pathRef.current;
    if (!el || !visible) return;
    const len = el.getTotalLength();
    el.style.strokeDasharray  = len;
    el.style.strokeDashoffset = len;
    el.getBoundingClientRect(); // force reflow
    el.style.transition = 'stroke-dashoffset 1.6s cubic-bezier(0.4,0,0.2,1)';
    el.style.strokeDashoffset = '0';
  }, [visible]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="chart-svg">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#416f40" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#416f40" stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)"/>
      <path d={line} ref={pathRef} fill="none" stroke="#6ab868" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Last point highlight */}
      <circle
        cx={pts[pts.length-1].x} cy={pts[pts.length-1].y}
        r="4" fill="#6ab868"
        style={{ filter: 'drop-shadow(0 0 6px rgba(106,184,104,0.8))' }}
      />
    </svg>
  );
}

/* ── Pilar chip helper ── */
const PILAR_STYLE = {
  autoridade: { color: 'var(--pilar-autoridade)', bg: 'var(--pilar-autoridade-bg)' },
  rosto:      { color: 'var(--pilar-rosto)',      bg: 'var(--pilar-rosto-bg)'      },
  isca:       { color: 'var(--pilar-isca)',       bg: 'var(--pilar-isca-bg)'       },
  conversa:   { color: 'var(--pilar-conversa)',   bg: 'var(--pilar-conversa-bg)'   },
};
function PilarChip({ pilar, label, small }) {
  const s = PILAR_STYLE[pilar] || PILAR_STYLE.autoridade;
  return (
    <span className="chip" style={{ color: s.color, background: s.bg, fontSize: small ? 9 : 10 }}>
      {label || pilar}
    </span>
  );
}

/* ── Format chip ── */
function FormatChip({ format }) {
  const fmtColors = {
    Reels:    { color: '#e07070', bg: 'rgba(224,112,112,0.12)' },
    Feed:     { color: '#70a0e0', bg: 'rgba(112,160,224,0.12)' },
    Carrossel:{ color: '#c9a227', bg: 'rgba(201,162,39,0.12)' },
    Story:    { color: '#9a70e0', bg: 'rgba(154,112,224,0.12)' },
  };
  const s = fmtColors[format] || { color: 'var(--text-secondary)', bg: 'var(--card)' };
  return <span className="chip" style={{ color: s.color, background: s.bg }}>{format}</span>;
}

/* ── Next Posts Preview ── */
function NextPosts({ visible }) {
  const today    = new Date(); today.setHours(0,0,0,0);
  const upcoming = (window.POSTS_DATA || [])
    .filter(p => new Date(p.date + 'T00:00:00') >= today)
    .slice(0, 4);

  const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];

  return (
    <div className={`chart-card reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '200ms' }}>
      <div className="chart-header">
        <span className="chart-title">Próximos Posts</span>
        <span className="chart-period">Próximas publicações agendadas</span>
      </div>
      {upcoming.map(p => {
        const d = new Date(p.date + 'T00:00:00');
        return (
          <div className="post-preview-item" key={p.date}>
            <div className="post-date-badge">
              <div className="post-date-day">{d.getDate()}</div>
              <div className="post-date-mon">{monthNames[d.getMonth()]}</div>
            </div>
            <div className="post-info">
              <div className="post-chips">
                <FormatChip format={p.format} />
                <PilarChip pilar={p.pilar} label={p.pilarLabel} small />
              </div>
              <div className="post-title-text">{p.title}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Quick actions ── */
function QuickActions({ onNavigate, visible }) {
  const actions = [
    { label: 'Ver Calendário', view: 'calendar', icon: '↗' },
    { label: 'Perguntar à IA',  view: 'assistant', icon: '✦' },
    { label: 'Ver Lembretes',  view: 'tasks',     icon: '✓' },
  ];
  return (
    <div className={`chart-card reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '320ms' }}>
      <div className="chart-header" style={{ marginBottom: 16 }}>
        <span className="chart-title">Acesso Rápido</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {actions.map(a => (
          <div
            key={a.view}
            onClick={() => onNavigate(a.view)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px',
              background: 'var(--input-bg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'background var(--t-fast), border-color var(--t-fast)',
              fontFamily: 'var(--font)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(65,111,64,0.1)';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--input-bg)';
              e.currentTarget.style.borderColor = 'var(--border-subtle)';
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{a.label}</span>
            <span style={{ fontSize: 14, color: 'var(--text-accent)', fontWeight: 700 }}>{a.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Compute metrics dynamically from live calendar state ── */
function computeDynamicMetrics() {
  try {
    const customPosts  = JSON.parse(sessionStorage.getItem('ctax-custom-posts')  || '{}');
    const doneDatesArr = JSON.parse(sessionStorage.getItem('ctax-done-dates')    || '[]');
    const deletedArr   = JSON.parse(sessionStorage.getItem('ctax-deleted-dates') || '[]');
    const deletedSet   = new Set(deletedArr);
    const map = {};
    (window.POSTS_DATA || []).forEach(p => {
      if (!deletedSet.has(p.date)) map[p.date] = p;
    });
    Object.entries(customPosts).forEach(([date, post]) => { map[date] = post; });
    const totalPosts     = Object.keys(map).length;
    const publishedCount = doneDatesArr.filter(d => map[d]).length;
    const base = window.METRICS || [];
    return [
      { label: 'Posts Planejados', value: totalPosts,     trend: 'Jun–Set 2026' },
      { label: 'Posts Publicados', value: publishedCount, trend: publishedCount > 0 ? `${publishedCount} publicado${publishedCount !== 1 ? 's' : ''}` : 'Iniciando em breve' },
      base[2] || { label: 'Alcance',     value: 0, suffix: '',  trend: 'Dados em breve' },
      base[3] || { label: 'Engajamento', value: 0, suffix: '%', trend: 'Dados em breve' },
    ];
  } catch (_) {
    return window.METRICS || [];
  }
}

/* ── Main Dashboard ── */
function Dashboard({ onNavigate }) {
  const { useRef, useState, useEffect } = React;
  const sectionRef = useRef(null);
  const visible    = useReveal(sectionRef);
  const [metrics, setMetrics] = useState(() => computeDynamicMetrics());
  const chartData  = window.CHART_DATA || [];

  // Re-compute on Calendar mutations + Supabase load
  useEffect(() => {
    const handler = () => setMetrics(computeDynamicMetrics());
    window.addEventListener('ctax-metrics-update', handler);
    // Also load from Supabase directly (handles Dashboard-first open)
    if (window.SupaDB) {
      window.SupaDB.read('calendar').then(data => {
        if (!data || typeof data !== 'object') return;
        try {
          if (data.customPosts)             sessionStorage.setItem('ctax-custom-posts',  JSON.stringify(data.customPosts));
          if (Array.isArray(data.doneDates))    sessionStorage.setItem('ctax-done-dates',    JSON.stringify(data.doneDates));
          if (Array.isArray(data.deletedDates)) sessionStorage.setItem('ctax-deleted-dates', JSON.stringify(data.deletedDates));
          setMetrics(computeDynamicMetrics());
        } catch (_) {}
      });
    }
    return () => window.removeEventListener('ctax-metrics-update', handler);
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';

  return (
    <div ref={sectionRef} className="content-inner">
      {/* Header */}
      <div className="section-header" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Watermark */}
        <div style={{
          position: 'absolute', top: '50%', left: '-5%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(64px, 10vw, 130px)',
          fontWeight: 900, color: 'var(--c-green)',
          opacity: 0.04, whiteSpace: 'nowrap',
          pointerEvents: 'none', userSelect: 'none',
          letterSpacing: '-0.02em', fontFamily: 'var(--font)',
          zIndex: 0,
        }}>CONSTRUTAX</div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className={`section-eyebrow reveal${visible ? ' visible' : ''}`}>
            {greeting}, Rachel
          </div>
          <h1 className={`section-title reveal reveal-delay-1${visible ? ' visible' : ''}`}>
            CONSTRUTAX<span> Studio</span>
          </h1>
          <p className={`section-sub reveal reveal-delay-2${visible ? ' visible' : ''}`}>
            Central de comando de conteúdo · Junho 2026
          </p>
        </div>
      </div>

      {/* Metrics grid */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <MetricCard key={m.label} metric={m} index={i} visible={visible} />
        ))}
      </div>

      {/* Chart + next posts + quick actions */}
      <div className="grid-3" style={{ marginBottom: 24, gridTemplateColumns: '1.7fr 1fr' }}>
        {/* Chart card */}
        <div className={`chart-card reveal${visible ? ' visible' : ''}`} style={{ transitionDelay: '120ms' }}>
          <div className="chart-header">
            <span className="chart-title">Atividade dos últimos 30 dias</span>
            <span className="chart-period">engajamento acumulado</span>
          </div>
          <ActivityChart data={chartData} visible={visible} />
          <div style={{ marginTop: 14, fontSize: 11, color: 'var(--text-muted)', fontWeight: 500 }}>
            Os dados de engajamento aparecem automaticamente após as primeiras publicações.
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <QuickActions onNavigate={onNavigate} visible={visible} />
        </div>
      </div>

      {/* Next posts */}
      <NextPosts visible={visible} />
    </div>
  );
}

window.Dashboard   = Dashboard;
window.PilarChip   = PilarChip;
window.FormatChip  = FormatChip;
