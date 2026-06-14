/* ============================================================
   CONSTRUTAX STUDIO — AI PORTAL (ConstrutaxPRO)
   Link de produção: Gem real do Google Gemini
   ============================================================ */

function Assistant() {
  const GEM_URL = 'https://gemini.google.com/gem/1lA6XuGCxoIM-F6EF_hKY9N2E6pclo3jT?usp=sharing';

  const openGem = () => window.open(GEM_URL, '_blank', 'noopener,noreferrer');

  const capabilities = [
    {
      title: 'Temas da semana',
      desc: 'Pautas quentes da Reforma',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M7 2v4M15 2v4M2 9h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M7 13h2M13 13h2M7 16h2M13 16h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: 'Roteiro de reel',
      desc: 'Vídeo da Rachel à câmera',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="4" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M16 8l4-2v10l-4-2V8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Legenda de post',
      desc: 'Instagram, Facebook, LinkedIn',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M3 5h16M3 9h10M3 13h12M3 17h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M16 14l2-2 2 2M18 12v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Pauta de carrossel',
      desc: 'Narrativa em slides',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect x="2" y="5" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
          <rect x="12" y="5" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M5 11h2M15 11h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      title: 'CTA de conversão',
      desc: 'Chamada no tom certo',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M8 11h6M12 8l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      title: 'Análise do calendário',
      desc: 'Planejar a semana',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M4 16l4-4 3 3 4-5 3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="2" y="3" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6"/>
          <path d="M2 8h18" stroke="currentColor" strokeWidth="1.6"/>
        </svg>
      ),
    },
    {
      title: 'Explicação técnica',
      desc: 'Traduzir tema complexo',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2a6 6 0 0 1 4 10.5V14H7v-1.5A6 6 0 0 1 11 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          <path d="M8 14v1a3 3 0 0 0 6 0v-1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M11 6v3M9.5 7.5l3 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
        </svg>
      ),
    },
    {
      title: 'Briefing de arte',
      desc: 'Descrever a peça visual',
      icon: (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6"/>
          <circle cx="8" cy="9" r="1.5" fill="currentColor" opacity="0.6"/>
          <circle cx="14" cy="9" r="1.5" fill="currentColor" opacity="0.6"/>
          <circle cx="11" cy="14" r="1.5" fill="currentColor" opacity="0.6"/>
          <path d="M8 9 Q11 12 14 9" stroke="currentColor" strokeWidth="1.3" fill="none" opacity="0.4"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="content-inner" style={{ maxWidth: 840 }}>

      {/* ── Header ── */}
      <div className="section-header">
        <div className="section-eyebrow">Assistente Especializado</div>
        <h1 className="section-title">Construtax<span>PRO</span></h1>
        <p className="section-sub" style={{ maxWidth: 600 }}>
          Seu parceiro de conteúdo e estratégia editorial.
        </p>
      </div>

      {/* ── Main portal card ── */}
      <div style={{
        background: 'var(--card)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-xl)',
        padding: '40px 36px 36px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 24,
      }}>
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, var(--c-green-dark), var(--c-green), #c9a227, var(--c-green), var(--c-green-dark))',
        }} />
        {/* Glow */}
        <div style={{ position:'absolute', top:'-30%', right:'-8%', width:280, height:280, background:'radial-gradient(circle, rgba(65,111,64,0.09) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-20%', left:'-4%', width:200, height:200, background:'radial-gradient(circle, rgba(201,162,39,0.05) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div style={{ position:'relative', zIndex:1 }}>
          {/* Icon + description */}
          <div style={{ display:'flex', gap:28, alignItems:'flex-start', marginBottom:32, flexWrap:'wrap' }}>
            <div style={{
              width:68, height:68, flexShrink:0,
              background:'rgba(65,111,64,0.1)',
              border:'1px solid var(--border-strong)',
              borderRadius:18,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:26, boxShadow:'var(--shadow-green)',
            }}>✦</div>
            <div style={{ flex:1, minWidth:220 }}>
              <div style={{ fontSize:17, fontWeight:800, color:'var(--text-primary)', marginBottom:10, lineHeight:1.3 }}>
                Inteligência editorial especializada
              </div>
              <p style={{ fontSize:13.5, color:'var(--text-secondary)', lineHeight:1.75, margin:0 }}>
                Especializado em <strong style={{ color:'var(--text-primary)', fontWeight:700 }}>Reforma Tributária</strong> para construção civil e em comunicação de autoridade para Instagram, Facebook e LinkedIn.
                Domina <strong style={{ color:'var(--text-primary)', fontWeight:600 }}>IBS, CBS, RET, patrimônio de afetação, contratos de empreitada e permuta</strong> — e transforma esse conhecimento em conteúdo que posiciona a CONSTRUTAX como referência.
              </p>
            </div>
          </div>

          {/* CTA */}
          <a
            href={GEM_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center',
              gap:12, padding:'15px 32px',
              background:'var(--c-green)', color:'white',
              textDecoration:'none', borderRadius:'var(--radius-md)',
              fontFamily:'var(--font)', fontSize:15, fontWeight:800,
              letterSpacing:'-0.01em',
              boxShadow:'0 4px 20px rgba(65,111,64,0.38)',
              transition:'background var(--t-fast), transform var(--t-fast), box-shadow var(--t-fast)',
              width:'100%',
            }}
            onMouseEnter={e => { e.currentTarget.style.background='var(--c-green-dark)'; e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(65,111,64,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.background='var(--c-green)'; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 20px rgba(65,111,64,0.38)'; }}
          >
            Abrir ConstrutaxPRO
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── 8 Capability cards ── */}
      <div style={{ marginBottom:32 }}>
        <div style={{ fontSize:10, fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--text-muted)', marginBottom:16 }}>
          O que o ConstrutaxPRO faz
        </div>
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(172px, 1fr))',
          gap:10,
        }}>
          {capabilities.map(({ title, desc, icon }) => (
            <div
              key={title}
              onClick={openGem}
              style={{
                background:'var(--card)',
                border:'1px solid var(--border)',
                borderRadius:'var(--radius-md)',
                padding:'16px 14px',
                cursor:'pointer',
                transition:'border-color var(--t-fast), background var(--t-fast), transform var(--t-fast)',
                display:'flex', flexDirection:'column', gap:10,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='var(--border-strong)'; e.currentTarget.style.background='var(--card-hover)'; e.currentTarget.style.transform='translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--card)'; e.currentTarget.style.transform='translateY(0)'; }}
            >
              <div style={{ color:'var(--text-accent)', width:22, height:22 }}>{icon}</div>
              <div>
                <div style={{ fontSize:12, fontWeight:700, color:'var(--text-primary)', lineHeight:1.3, marginBottom:3 }}>{title}</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', fontWeight:400, lineHeight:1.4 }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer ── */}
      <div style={{
        paddingTop:20,
        borderTop:'1px solid var(--border-subtle)',
        display:'flex', alignItems:'center', gap:10,
        color:'var(--text-muted)', fontSize:11, fontWeight:500,
      }}>
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
          <path d="M7.5 1C4.5 3.5 2 5.5 1 7.5c1 2 3.5 4 6.5 6.5 3-2.5 5.5-4.5 6.5-6.5-1-2-3.5-4-6.5-6.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity="0.7"/>
          <path d="M7.5 1v13M1 7.5h13" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" opacity="0.4"/>
        </svg>
        Powered by Google Gemini &nbsp;·&nbsp; ConstrutaxPRO
      </div>

    </div>
  );
}

window.Assistant = Assistant;
