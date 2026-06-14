/* ============================================================
   CONSTRUTAX STUDIO — SIDEBAR NAVIGATION v2
   Symbol-only logo: SVG drawn inline (no image, full color control)
   ============================================================ */

/* ── Sidebar logo: PNG real, troca com o tema ── */
function SidebarLogo({ dark }) {
  const src = dark ? 'assets/logo-dark.png' : 'assets/logo-light.png';
  return (
    <img
      key={src}
      src={src}
      alt="CONSTRUTAX"
      style={{
        width: 148,
        height: 'auto',
        display: 'block',
        animation: 'sideLogoIn 0.48s cubic-bezier(0.34,1.2,0.64,1) both',
        filter: dark
          ? 'drop-shadow(0 0 18px rgba(65,111,64,0.28))'
          : 'none',
      }}
      draggable="false"
    />
  );
}

/* ── Nav SVG Icons ── */
function IconDashboard({ active }) {
  const c = active ? 'var(--text-accent)' : 'var(--text-muted)';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5"/>
      <rect x="10.5" y="1.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5"/>
      <rect x="1.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5"/>
      <rect x="10.5" y="10.5" width="6" height="6" rx="1.5" stroke={c} strokeWidth="1.5"/>
    </svg>
  );
}
function IconCalendar({ active }) {
  const c = active ? 'var(--text-accent)' : 'var(--text-muted)';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <rect x="1.5" y="3" width="15" height="13.5" rx="2" stroke={c} strokeWidth="1.5"/>
      <path d="M1.5 7.5h15" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M6 1.5v3M12 1.5v3" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="11" r="1" fill={c}/>
      <circle cx="9" cy="11" r="1" fill={c}/>
      <circle cx="12" cy="11" r="1" fill={c}/>
    </svg>
  );
}
function IconAssistant({ active }) {
  const c = active ? 'var(--text-accent)' : 'var(--text-muted)';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 3a1.5 1.5 0 0 1 1.5-1.5h11A1.5 1.5 0 0 1 16 3v8a1.5 1.5 0 0 1-1.5 1.5H11l-2 3-2-3H3.5A1.5 1.5 0 0 1 2 11V3Z" stroke={c} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx="6" cy="7" r="1" fill={c}/>
      <circle cx="9" cy="7" r="1" fill={c}/>
      <circle cx="12" cy="7" r="1" fill={c}/>
    </svg>
  );
}
function IconTasks({ active }) {
  const c = active ? 'var(--text-accent)' : 'var(--text-muted)';
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2.5 4h2m0 0 2 2 4-4M4.5 4H16" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 9h2m0 0 2 2 4-4M4.5 9H16" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 14h2m2 0h9" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
function IconSun() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M2.9 2.9l1.06 1.06M10.04 10.04l1.06 1.06M2.9 11.1l1.06-1.06M10.04 3.96l1.06-1.06" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
}
function IconMoon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M12 7.5A5.5 5.5 0 1 1 6.5 2c0 0 2 .5 3 2s2 3.5 2.5 3.5Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Main Sidebar ── */
function Sidebar({ view, onNavigate, theme, onToggleTheme, mobileOpen }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard',     Icon: IconDashboard },
    { id: 'calendar',  label: 'Calendário',    Icon: IconCalendar  },
    { id: 'assistant', label: 'Assistente IA', Icon: IconAssistant },
    { id: 'tasks',     label: 'Lembretes',     Icon: IconTasks     },
  ];
  const isDark = theme === 'dark';

  return (
    <aside className={`sidebar${mobileOpen ? ' mobile-open' : ''}`}>
      {/* Logo — PNG real, troca com tema */}
      <div className="sidebar-logo" style={{ paddingBottom: 16 }}>
        <SidebarLogo dark={isDark} />
      </div>

      {/* Nav */}
      <span className="sidebar-label">Menu</span>
      <nav className="sidebar-nav">
        {navItems.map(({ id, label, Icon }) => {
          const isActive = view === id;
          return (
            <div
              key={id}
              className={`nav-item${isActive ? ' active' : ''}`}
              onClick={() => onNavigate(id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onNavigate(id)}
            >
              <span className="nav-icon"><Icon active={isActive} /></span>
              <span>{label}</span>
              {isActive && <span className="nav-dot" />}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <button className="theme-toggle" onClick={onToggleTheme} title="Alternar tema">
          <span style={{ color: 'var(--text-muted)' }}>{isDark ? <IconMoon /> : <IconSun />}</span>
          <span style={{ flex: 1, textAlign: 'left' }}>{isDark ? 'Modo escuro' : 'Modo claro'}</span>
          <span className={`toggle-pill${isDark ? '' : ' on'}`}>
            <span className="toggle-knob" />
          </span>
        </button>
        <div className="sidebar-user">
          <div className="user-avatar">R</div>
          <div className="user-info">
            <div className="user-name">Rachel</div>
            <div className="user-role">CONSTRUTAX Studio</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar     = Sidebar;
window.SidebarLogo = SidebarLogo;
/* Export icons so App.jsx can use them in the bottom nav */
window.IconDashboard = IconDashboard;
window.IconCalendar  = IconCalendar;
window.IconAssistant = IconAssistant;
window.IconTasks     = IconTasks;
