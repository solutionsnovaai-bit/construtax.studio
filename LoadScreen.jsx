/* ============================================================
   CONSTRUTAX STUDIO — LOAD SCREEN
   ============================================================ */

function LoadScreen({ onComplete }) {
  const { useState, useEffect, useRef } = React;

  const [progress, setProgress]   = useState(0);
  const [logoReady, setLogoReady] = useState(false);
  const [logoSrc, setLogoSrc]     = useState('assets/logo-3d.png');
  const [exiting, setExiting]     = useState(false);
  const intervalRef = useRef(null);

  /* ── Strip white background from logo PNG via canvas ── */
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c   = document.createElement('canvas');
        c.width   = img.naturalWidth  || img.width;
        c.height  = img.naturalHeight || img.height;
        const ctx = c.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const d = ctx.getImageData(0, 0, c.width, c.height);
        for (let i = 0; i < d.data.length; i += 4) {
          if (d.data[i] > 235 && d.data[i+1] > 235 && d.data[i+2] > 235) {
            d.data[i+3] = 0;
          }
        }
        ctx.putImageData(d, 0, 0);
        setLogoSrc(c.toDataURL('image/png'));
      } catch(e) {
        // CORS or tainted canvas – just use the original
      }
      setLogoReady(true);
    };
    img.onerror = () => setLogoReady(true);
    img.src = 'assets/logo-3d.png';
  }, []);

  /* ── Progress bar animation ── */
  useEffect(() => {
    if (!logoReady) return;
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += (100 - p) * 0.11 + 0.5;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 680);
        }, 320);
      }
      setProgress(Math.min(100, p));
    }, 40);
    return () => clearInterval(intervalRef.current);
  }, [logoReady, onComplete]);

  return (
    <div className={`load-screen${exiting ? ' exit' : ''}`}>
      {/* Atmospheric radial glow behind logo */}
      <div style={{
        position: 'absolute',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(65,111,64,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'glow-pulse 3s ease-in-out infinite',
      }} />

      {/* Logo */}
      <div className="load-logo-wrap">
        {logoReady && (
          <>
            <img
              src={logoSrc}
              className="load-logo-img"
              alt="CONSTRUTAX"
              draggable="false"
            />
            <div className="load-shimmer" />
          </>
        )}
      </div>

      {/* Progress bar */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        <div className="load-bar-track">
          <div className="load-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <p className="load-label">
          {progress < 60 ? 'Carregando plataforma…' :
           progress < 90 ? 'Preparando seu estúdio…' :
                           'Quase lá…'}
        </p>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%      { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

window.LoadScreen = LoadScreen;
