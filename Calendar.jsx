/* ============================================================
   CONSTRUTAX STUDIO — CALENDAR VIEW v2
   Full interactivity: agendar, editar, marcar publicado, remover.
   Estado persistido no sessionStorage (sem backend).
   ============================================================ */

const CAL_PILAR_CFG = {
  autoridade: { label: 'Autoridade Técnica',      color: 'var(--pilar-autoridade)', bg: 'var(--pilar-autoridade-bg)', dot: 'var(--pilar-autoridade)' },
  rosto:      { label: 'Rosto e Confiança',       color: 'var(--pilar-rosto)',      bg: 'var(--pilar-rosto-bg)',      dot: 'var(--pilar-rosto)'      },
  isca:       { label: 'Isca e Conversão',        color: 'var(--pilar-isca)',       bg: 'var(--pilar-isca-bg)',       dot: 'var(--pilar-isca)'       },
  conversa:   { label: 'Conversa e Engajamento',  color: 'var(--pilar-conversa)',   bg: 'var(--pilar-conversa-bg)',   dot: 'var(--pilar-conversa)'   },
};
const CAL_DOW_LABELS  = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const CAL_MONTH_NAMES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const CAL_FMT_COLOR   = { Feed:'#70a0e0', Carrossel:'#c9a227', Reels:'#e07070', Story:'#9a70e0' };
const CAL_PILARES = [
  { id:'autoridade', label:'Autoridade', color:'var(--pilar-autoridade)', bg:'var(--pilar-autoridade-bg)' },
  { id:'rosto',      label:'Rosto',      color:'var(--pilar-rosto)',      bg:'var(--pilar-rosto-bg)'      },
  { id:'isca',       label:'Isca',       color:'var(--pilar-isca)',       bg:'var(--pilar-isca-bg)'       },
  { id:'conversa',   label:'Conversa',   color:'var(--pilar-conversa)',   bg:'var(--pilar-conversa-bg)'   },
];

function calBuildGrid(year, month) {
  const firstDow  = new Date(year, month, 1).getDay();
  const daysTotal = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysTotal; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

function calLoadSession(key, fallback) {
  try { const v = sessionStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}
function calSaveSession(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {}
}

/* ── Post Form: criar ou editar ── */
function PostForm({ date, post, onSave, onCancel }) {
  const { useState: useS } = React;
  const [title,  setTitle]  = useS(post?.title || '');
  const [format, setFormat] = useS(post?.format || 'Feed');
  const [pilar,  setPilar]  = useS(post?.pilar || 'autoridade');
  const [desc,   setDesc]   = useS(post?.description || '');

  const save = () => {
    if (!title.trim()) return;
    const pilarObj = CAL_PILARES.find(p => p.id === pilar);
    onSave({
      title:      title.trim(),
      format,
      pilar,
      pilarLabel: pilarObj ? pilarObj.label : pilar,
      description:desc.trim() || 'Post personalizado.',
      funnel:     'Personalizado',
      cta:        '',
    });
  };

  const inputStyle = {
    width:'100%', background:'var(--input-bg)', border:'1px solid var(--input-border)',
    borderRadius:'var(--radius-sm)', padding:'10px 14px',
    fontFamily:'var(--font)', fontSize:13, color:'var(--text-primary)', outline:'none',
  };

  return (
    <div>
      {/* Título */}
      <div className="drawer-field">
        <div className="drawer-field-label">Título *</div>
        <input
          style={inputStyle}
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Como o RET impacta sua incorporação"
          onKeyDown={e => e.key === 'Enter' && save()}
          autoFocus
        />
      </div>

      {/* Formato */}
      <div className="drawer-field">
        <div className="drawer-field-label">Formato</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {['Feed','Carrossel','Reels','Story'].map(f => (
            <button key={f} onClick={() => setFormat(f)} style={{
              padding:'6px 14px', borderRadius:99,
              border:`1.5px solid ${format === f ? CAL_FMT_COLOR[f]||'var(--c-green)' : 'var(--border)'}`,
              background: format === f ? `${CAL_FMT_COLOR[f]||'#416f40'}22` : 'transparent',
              color: format === f ? CAL_FMT_COLOR[f]||'var(--c-green)' : 'var(--text-muted)',
              fontFamily:'var(--font)', fontSize:12, fontWeight:600,
              cursor:'pointer', transition:'all var(--t-fast)',
            }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Pilar */}
      <div className="drawer-field">
        <div className="drawer-field-label">Pilar</div>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {CAL_PILARES.map(p => (
            <button key={p.id} onClick={() => setPilar(p.id)} style={{
              padding:'6px 14px', borderRadius:99,
              border:`1.5px solid ${pilar === p.id ? p.color : 'var(--border)'}`,
              background: pilar === p.id ? p.bg : 'transparent',
              color: pilar === p.id ? p.color : 'var(--text-muted)',
              fontFamily:'var(--font)', fontSize:12, fontWeight:600,
              cursor:'pointer', transition:'all var(--t-fast)',
            }}>{p.label}</button>
          ))}
        </div>
      </div>

      {/* Descrição opcional */}
      <div className="drawer-field">
        <div className="drawer-field-label">Descrição <span style={{color:'var(--text-muted)',fontWeight:400}}>opcional</span></div>
        <textarea
          style={{ ...inputStyle, resize:'none', lineHeight:1.5 }}
          value={desc}
          onChange={e => setDesc(e.target.value)}
          placeholder="Briefing, ângulo, referências..."
          rows={3}
        />
      </div>

      {/* Botões */}
      <div style={{ display:'flex', gap:10, marginTop:4 }}>
        <button onClick={onCancel} style={{
          flex:1, padding:'11px', background:'var(--input-bg)',
          border:'1px solid var(--border)', borderRadius:'var(--radius-md)',
          fontFamily:'var(--font)', fontSize:13, fontWeight:600,
          color:'var(--text-secondary)', cursor:'pointer',
        }}>Cancelar</button>
        <button onClick={save} disabled={!title.trim()} style={{
          flex:2, padding:'11px', background: title.trim() ? 'var(--c-green)' : 'var(--card)',
          color:'white', border:'none', borderRadius:'var(--radius-md)',
          fontFamily:'var(--font)', fontSize:13, fontWeight:700,
          cursor: title.trim() ? 'pointer' : 'not-allowed', opacity: title.trim() ? 1 : 0.45,
          transition:'background var(--t-fast)',
        }}
        onMouseEnter={e => { if(title.trim()) e.currentTarget.style.background='var(--c-green-dark)'; }}
        onMouseLeave={e => { if(title.trim()) e.currentTarget.style.background='var(--c-green)'; }}
        >{post ? 'Salvar edição' : 'Agendar post'}</button>
      </div>
    </div>
  );
}

/* ── Drawer lateral completo ── */
function CalendarDrawer({ state, doneDates, onClose, onSave, onDelete, onToggleDone }) {
  const { useState: useS, useEffect: useEff } = React;
  const [mode, setMode] = useS('view'); // 'view' | 'form'

  useEff(() => { if (state.open) setMode('view'); }, [state.open, state.dateStr]);
  useEff(() => {
    const h = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const { post, dateStr, open } = state;
  const isDone = doneDates.has(dateStr);
  const pilarCfg = post ? (CAL_PILAR_CFG[post.pilar] || CAL_PILAR_CFG.autoridade) : null;

  const fmtDate = str => {
    if (!str) return '';
    const d   = new Date(str + 'T00:00:00');
    const dow = ['domingo','segunda','terça','quarta','quinta','sexta','sábado'];
    return `${dow[d.getDay()]}, ${d.getDate()} de ${CAL_MONTH_NAMES[d.getMonth()].toLowerCase()}`;
  };

  const actionBtn = (label, onClick, opts = {}) => (
    <button onClick={onClick} style={{
      width:'100%', padding:'12px 16px', borderRadius:'var(--radius-md)',
      background: opts.bg || 'var(--input-bg)',
      border: `1px solid ${opts.borderColor || 'var(--border)'}`,
      color: opts.color || 'var(--text-secondary)',
      fontFamily:'var(--font)', fontSize:13, fontWeight:600,
      cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:10,
      transition:'all var(--t-fast)',
      ...opts.style,
    }}
    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
    >
      {opts.icon && <svg width="16" height="16" viewBox="0 0 16 16" fill="none">{opts.icon}</svg>}
      {label}
    </button>
  );

  return (
    <>
      <div className={`drawer-overlay${open ? ' open' : ''}`} onClick={onClose} />
      <aside className={`drawer${open ? ' open' : ''}`}>
        <div className="drawer-header">
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:6 }}>
              {dateStr ? fmtDate(dateStr) : '—'}
            </div>
            <div style={{ fontSize:16, fontWeight:800, color:'var(--text-primary)', lineHeight:1.25 }}>
              {mode === 'form'
                ? (post ? 'Editar post' : '+ Agendar post')
                : (post ? post.title : 'Dia livre')}
            </div>
          </div>
          <button className="drawer-close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="drawer-body">
          {mode === 'form' ? (
            <PostForm
              date={dateStr}
              post={post}
              onSave={(newPost) => { onSave(dateStr, newPost); setMode('view'); }}
              onCancel={() => setMode('view')}
            />
          ) : post ? (
            <>
              {/* Chips */}
              <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
                <span className="chip" style={{ color:CAL_FMT_COLOR[post.format]||'#888', background:`${CAL_FMT_COLOR[post.format]||'#888'}1a`, fontSize:11, padding:'4px 10px' }}>
                  {post.format}
                </span>
                <span className="chip" style={{ color:pilarCfg.color, background:pilarCfg.bg, fontSize:11, padding:'4px 10px' }}>
                  {pilarCfg.label}
                </span>
                {isDone && (
                  <span className="chip" style={{ color:'#416f40', background:'rgba(65,111,64,0.18)', fontSize:11, padding:'4px 10px' }}>
                    ✓ Publicado
                  </span>
                )}
              </div>

              {/* Descrição */}
              {post.description && (
                <div className="drawer-field">
                  <div className="drawer-field-label">Descrição</div>
                  <div className="drawer-field-value">{post.description}</div>
                </div>
              )}

              {/* Funil */}
              {post.funnel && post.funnel !== 'Personalizado' && (
                <div className="drawer-field">
                  <div className="drawer-field-label">Função no Funil</div>
                  <div className="drawer-field-value" style={{ color:'var(--text-accent)', fontWeight:600 }}>{post.funnel}</div>
                </div>
              )}

              {/* CTA */}
              {post.cta && (
                <div className="drawer-field">
                  <div className="drawer-field-label">CTA</div>
                  <div className="drawer-field-value" style={{ background:'rgba(65,111,64,0.08)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:'12px 14px', fontStyle:'italic', color:'var(--text-secondary)' }}>
                    "{post.cta}"
                  </div>
                </div>
              )}

              {/* Ações */}
              <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:24 }}>
                <button onClick={() => onToggleDone(dateStr)} style={{
                  width:'100%', padding:'12px 16px', borderRadius:'var(--radius-md)',
                  background: isDone ? 'rgba(65,111,64,0.1)' : 'var(--c-green)',
                  border: isDone ? '1px solid var(--border-strong)' : 'none',
                  color: isDone ? 'var(--text-accent)' : 'white',
                  fontFamily:'var(--font)', fontSize:13, fontWeight:700,
                  cursor:'pointer', textAlign:'left', display:'flex', alignItems:'center', gap:10,
                  transition:'all var(--t-fast)',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    {isDone
                      ? <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      : <path d="M2 8l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
                  </svg>
                  {isDone ? 'Desmarcar como publicado' : 'Marcar como publicado'}
                </button>

                <button onClick={() => setMode('form')} style={{
                  width:'100%', padding:'12px 16px', borderRadius:'var(--radius-md)',
                  background:'var(--input-bg)', border:'1px solid var(--border)',
                  color:'var(--text-secondary)', fontFamily:'var(--font)',
                  fontSize:13, fontWeight:600, cursor:'pointer',
                  textAlign:'left', display:'flex', alignItems:'center', gap:10,
                  transition:'all var(--t-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--text-primary)'; e.currentTarget.style.borderColor='var(--border-strong)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--text-secondary)'; e.currentTarget.style.borderColor='var(--border)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 14l3-1 8-8-2-2-8 8-1 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                    <path d="M10 3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Editar post
                </button>

                <button onClick={() => { onDelete(dateStr); onClose(); }} style={{
                  width:'100%', padding:'12px 16px', borderRadius:'var(--radius-md)',
                  background:'transparent', border:'1px solid rgba(224,82,82,0.22)',
                  color:'#e05252', fontFamily:'var(--font)',
                  fontSize:13, fontWeight:600, cursor:'pointer',
                  textAlign:'left', display:'flex', alignItems:'center', gap:10,
                  transition:'all var(--t-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(224,82,82,0.07)'; e.currentTarget.style.borderColor='rgba(224,82,82,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.borderColor='rgba(224,82,82,0.22)'; }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 5h10M6 5V3h4v2M4 5l1 8h6l1-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Remover post
                </button>
              </div>
            </>
          ) : (
            /* Dia vazio */
            <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'32px 0', gap:16, textAlign:'center' }}>
              <div style={{
                width:52, height:52, borderRadius:16,
                background:'rgba(65,111,64,0.08)', border:'1px dashed rgba(65,111,64,0.28)',
                display:'flex', alignItems:'center', justifyContent:'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="var(--text-accent)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:600, color:'var(--text-primary)', marginBottom:4 }}>Dia livre</div>
                <div style={{ fontSize:12, color:'var(--text-muted)' }}>Nenhum post agendado aqui</div>
              </div>
              <button
                onClick={() => setMode('form')}
                style={{
                  padding:'12px 24px', background:'var(--c-green)',
                  color:'white', border:'none', borderRadius:'var(--radius-md)',
                  fontFamily:'var(--font)', fontSize:13, fontWeight:700,
                  cursor:'pointer', transition:'background var(--t-fast)',
                  display:'flex', alignItems:'center', gap:8,
                }}
                onMouseEnter={e => e.currentTarget.style.background='var(--c-green-dark)'}
                onMouseLeave={e => e.currentTarget.style.background='var(--c-green)'}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2v10M2 7h10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Agendar post
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ── Célula de dia ── */
function CalDay({ day, year, month, postsMap, doneDates, isToday, onDayClick }) {
  if (day === null) return <div className="cal-day empty" />;

  const pad  = String(day).padStart(2,'0');
  const mon  = String(month + 1).padStart(2,'0');
  const key  = `${year}-${mon}-${pad}`;
  const post = postsMap[key];
  const cfg  = post ? (CAL_PILAR_CFG[post.pilar] || CAL_PILAR_CFG.autoridade) : null;
  const done = doneDates.has(key);

  return (
    <div
      className={`cal-day${isToday ? ' today' : ''}`}
      onClick={() => onDayClick(key, post)}
      title={post ? post.title : `${day} — clique para agendar`}
    >
      <div className="cal-day-num">
        {isToday && <span className="today-dot" />}
        {day}
      </div>
      {post ? (
        <div
          className="cal-post-chip"
          style={{
            color: done ? '#416f40' : cfg.color,
            background: done ? 'rgba(65,111,64,0.15)' : cfg.bg,
            opacity: done ? 0.72 : 1,
          }}
        >
          {done ? '✓ ' : ''}{post.format} · {post.title.length > 22 ? post.title.slice(0,22)+'…' : post.title}
        </div>
      ) : (
        <span className="cal-add-btn">+</span>
      )}
    </div>
  );
}

/* ── Mobile Agenda View ── */
function CalMobileAgenda({ year, month, postsMap, doneDates, isThisMonth, todayDate, onDayClick }) {
  const daysTotal = new Date(year, month + 1, 0).getDate();
  const DOW = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];

  return (
    <div className="cal-agenda-list">
      {Array.from({ length: daysTotal }, (_, i) => i + 1).map(day => {
        const pad  = String(day).padStart(2,'0');
        const mon  = String(month + 1).padStart(2,'0');
        const key  = `${year}-${mon}-${pad}`;
        const post = postsMap[key];
        const cfg  = post ? (CAL_PILAR_CFG[post.pilar] || CAL_PILAR_CFG.autoridade) : null;
        const done = doneDates.has(key);
        const isToday = isThisMonth && day === todayDate;
        const dow  = DOW[new Date(year, month, day).getDay()];

        return (
          <div key={key} className={`cal-agenda-day${isToday ? ' today' : ''}${!post ? ' cal-agenda-day-empty' : ''}`}>
            <div className="cal-agenda-day-num">
              {isToday && (
                <span style={{ display:'block', width:5, height:5, borderRadius:'50%', background:'#c9a227', margin:'0 auto 3px', boxShadow:'0 0 5px rgba(201,162,39,0.8)' }} />
              )}
              <span className="num" style={isToday ? { color:'#c9a227' } : {}}>{day}</span>
              <span className="dow">{dow}</span>
            </div>

            {post ? (
              <div className="cal-agenda-post-card" onClick={() => onDayClick(key, post)}>
                <div style={{ display:'flex', gap:6, marginBottom:6, flexWrap:'wrap' }}>
                  <span className="chip" style={{ color: CAL_FMT_COLOR[post.format]||'#888', background:`${CAL_FMT_COLOR[post.format]||'#888'}1a`, fontSize:9, padding:'2px 8px' }}>
                    {post.format}
                  </span>
                  <span className="chip" style={{ color: done ? '#416f40' : cfg.color, background: done ? 'rgba(65,111,64,0.15)' : cfg.bg, fontSize:9, padding:'2px 8px' }}>
                    {done ? '✓ Pub.' : cfg.label}
                  </span>
                </div>
                <div style={{ fontSize:13, fontWeight:600, color:'var(--text-primary)', lineHeight:1.35 }}>
                  {post.title}
                </div>
              </div>
            ) : (
              <button className="cal-agenda-add-btn" onClick={() => onDayClick(key, null)}>
                <span style={{
                  width:26, height:26, borderRadius:8, flexShrink:0,
                  border:'1px dashed rgba(65,111,64,0.35)',
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:16, color:'var(--text-accent)',
                }}>+</span>
                <span>Agendar post</span>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Calendário principal ── */
function Calendar() {
  const { useState, useMemo, useEffect } = React;
  const months = window.CALENDAR_MONTHS || [];

  const [monthIdx, setMonthIdx] = useState(0);
  const [animDir,  setAnimDir]  = useState('');

  // Estado persistido
  const [customPosts,  setCustomPosts]  = useState(() => calLoadSession('ctax-custom-posts', {}));
  const [doneDates,    setDoneDates]    = useState(() => new Set(calLoadSession('ctax-done-dates', [])));
  const [deletedDates, setDeletedDates] = useState(() => new Set(calLoadSession('ctax-deleted-dates', [])));

  // ── Supabase: carregar dados ao montar (silencioso, não-bloqueante) ──
  useEffect(() => {
    if (!window.SupaDB) return;
    window.SupaDB.read('calendar').then(data => {
      if (data === null || typeof data !== 'object') return;
      try {
        if (data.customPosts && typeof data.customPosts === 'object') {
          setCustomPosts(data.customPosts);
          calSaveSession('ctax-custom-posts', data.customPosts);
        }
        if (Array.isArray(data.doneDates)) {
          setDoneDates(new Set(data.doneDates));
          calSaveSession('ctax-done-dates', data.doneDates);
        }
        if (Array.isArray(data.deletedDates)) {
          setDeletedDates(new Set(data.deletedDates));
          calSaveSession('ctax-deleted-dates', data.deletedDates);
        }
      } catch (_) {}
    });
  }, []);

  // Mapa combinado: padrão - deletados + customizados
  const combinedMap = useMemo(() => {
    const map = {};
    Object.entries(window.POSTS_BY_DATE || {}).forEach(([date, post]) => {
      if (!deletedDates.has(date)) map[date] = post;
    });
    Object.entries(customPosts).forEach(([date, post]) => {
      map[date] = post;
    });
    return map;
  }, [customPosts, deletedDates]);

  // Drawer
  const [drawer, setDrawer] = useState({ open:false, post:null, dateStr:'' });

  // Mobile responsive + swipe to change month
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 800);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 800);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  const [touchStartX, setTouchStartX] = useState(null);
  const handleTouchStart = e => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = e => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goMonth(dx < 0 ? 1 : -1);
    setTouchStartX(null);
  };

  // Ações
  const savePost = (date, post) => {
    const updated = { ...customPosts, [date]: post };
    setCustomPosts(updated);
    calSaveSession('ctax-custom-posts', updated);
    setDrawer({ open:true, post, dateStr:date });
    // Supabase sync — fire-and-forget
    window.SupaDB && window.SupaDB.write('calendar', {
      customPosts: updated,
      doneDates: [...doneDates],
      deletedDates: [...deletedDates],
    });
  };

  const toggleDone = date => {
    const updated = new Set(doneDates);
    if (updated.has(date)) updated.delete(date);
    else updated.add(date);
    setDoneDates(new Set(updated));
    calSaveSession('ctax-done-dates', [...updated]);
    // Supabase sync — fire-and-forget
    window.SupaDB && window.SupaDB.write('calendar', {
      customPosts,
      doneDates: [...updated],
      deletedDates: [...deletedDates],
    });
  };

  const deletePost = date => {
    const updCustom = { ...customPosts };
    delete updCustom[date];
    setCustomPosts(updCustom);
    calSaveSession('ctax-custom-posts', updCustom);
    const updDel = new Set(deletedDates);
    updDel.add(date);
    setDeletedDates(new Set(updDel));
    calSaveSession('ctax-deleted-dates', [...updDel]);
    // Supabase sync — fire-and-forget
    window.SupaDB && window.SupaDB.write('calendar', {
      customPosts: updCustom,
      doneDates: [...doneDates],
      deletedDates: [...updDel],
    });
  };

  const cur = months[monthIdx] || { year:2026, month:5 };
  const { year, month } = cur;
  const today       = new Date();
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month;
  const weeks       = calBuildGrid(year, month);

  const postsCount = Object.keys(combinedMap).filter(k => {
    const d = new Date(k + 'T00:00:00');
    return d.getFullYear() === year && d.getMonth() === month;
  }).length;

  const goMonth = dir => {
    const next = monthIdx + dir;
    if (next < 0 || next >= months.length) return;
    setAnimDir(dir > 0 ? 'left' : 'right');
    setTimeout(() => { setAnimDir(''); setMonthIdx(next); }, 180);
  };

  return (
    <div className="content-inner" style={{ maxWidth: 1100 }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="section-header">
        <div className="section-eyebrow">Planejamento</div>
        <h1 className="section-title">Calendário <span>Editorial</span></h1>
        <p className="section-sub">
          {postsCount > 0
            ? `${postsCount} post${postsCount !== 1 ? 's' : ''} em ${CAL_MONTH_NAMES[month]} · clique em qualquer dia para editar ou agendar`
            : `${CAL_MONTH_NAMES[month]} livre — clique em qualquer dia para agendar um post`}
        </p>
      </div>

      {/* Nav de mês */}
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={() => goMonth(-1)} disabled={monthIdx===0} style={{ opacity: monthIdx===0 ? 0.3 : 1 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <div className="cal-month-label" style={{ transition:'opacity 0.18s', opacity: animDir ? 0 : 1 }}>
          {CAL_MONTH_NAMES[month]} {year}
        </div>
        <div style={{ display:'flex', gap:6 }}>
          {months.map((m, i) => (
            <div key={m.label}
              onClick={() => { setAnimDir(i > monthIdx ? 'left' : 'right'); setTimeout(() => { setAnimDir(''); setMonthIdx(i); }, 180); }}
              style={{
                width:8, height:8, borderRadius:'50%', cursor:'pointer',
                background: i === monthIdx ? 'var(--c-green)' : 'var(--border)',
                transition:'background var(--t-fast), transform var(--t-spring)',
                transform: i === monthIdx ? 'scale(1.35)' : 'scale(1)',
                boxShadow: i === monthIdx ? '0 0 6px rgba(65,111,64,0.7)' : 'none',
              }} title={m.label}
            />
          ))}
        </div>
        <button className="cal-nav-btn" onClick={() => goMonth(1)} disabled={monthIdx===months.length-1} style={{ opacity: monthIdx===months.length-1 ? 0.3 : 1 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Grid (desktop) ou Agenda (mobile) */}
      {isMobile ? (
        <CalMobileAgenda
          year={year} month={month}
          postsMap={combinedMap}
          doneDates={doneDates}
          isThisMonth={isThisMonth}
          todayDate={today.getDate()}
          onDayClick={(dateStr, post) => setDrawer({ open:true, post, dateStr })}
        />
      ) : (
        <>
          {/* Header de dias */}
          <div className="cal-grid-header">
            {CAL_DOW_LABELS.map(d => <div className="cal-dow" key={d}>{d}</div>)}
          </div>

          {/* Grid */}
          <div className="cal-grid" style={{ transition:'opacity 0.18s', opacity: animDir ? 0 : 1 }}>
            {weeks.flat().map((day, i) => (
              <CalDay
                key={`${year}-${month}-${i}`}
                day={day} year={year} month={month}
                postsMap={combinedMap}
                doneDates={doneDates}
                isToday={isThisMonth && day === today.getDate()}
                onDayClick={(dateStr, post) => setDrawer({ open:true, post, dateStr })}
              />
            ))}
          </div>
        </>
      )}

      {/* Legenda */}
      <div className="cal-legend">
        {Object.entries(CAL_PILAR_CFG).map(([k, v]) => (
          <div className="legend-item" key={k}>
            <div className="legend-dot" style={{ background: v.dot }} />
            {v.label}
          </div>
        ))}
        <div className="legend-item">
          <div className="legend-dot" style={{ background:'#c9a227', boxShadow:'0 0 6px rgba(201,162,39,0.55)' }} />
          Hoje
        </div>
        <div className="legend-item">
          <div className="legend-dot" style={{ background:'#416f40', opacity:0.9 }} />
          Publicado
        </div>
      </div>

      {/* Drawer */}
      <CalendarDrawer
        state={drawer}
        doneDates={doneDates}
        onClose={() => setDrawer(d => ({ ...d, open:false }))}
        onSave={savePost}
        onDelete={deletePost}
        onToggleDone={toggleDone}
      />
    </div>
  );
}

window.Calendar = Calendar;
