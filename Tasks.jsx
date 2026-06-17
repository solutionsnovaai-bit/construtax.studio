/* ============================================================
   CONSTRUTAX STUDIO — TASKS / LEMBRETES VIEW
   ============================================================ */

let _taskId = 100;

/* ── Priority badge ── */
function PriorityBadge({ priority }) {
  const map = {
    high:   { label:'Alta',  cls:'priority-high' },
    medium: { label:'Média', cls:'priority-medium' },
    low:    { label:'Baixa', cls:'priority-low' },
  };
  const p = map[priority] || map.low;
  return <span className={`priority-tag ${p.cls}`}>{p.label}</span>;
}

/* ── Due date label ── */
function DueLabel({ due, done }) {
  if (!due) return null;
  const today = new Date(); today.setHours(0,0,0,0);
  const d     = new Date(due + 'T00:00:00');
  const diff  = Math.round((d - today) / 86400000);

  const MONTHS = ['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
  const label  = `${d.getDate()} ${MONTHS[d.getMonth()]}`;

  let cls = '';
  let prefix = '';
  if (!done) {
    if (diff < 0)       { cls = 'overdue'; prefix = 'Atrasado · '; }
    else if (diff <= 3) { cls = 'soon';    prefix = 'Em breve · '; }
  }

  return (
    <div className={`task-due${cls ? ' ' + cls : ''}`}>
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
        <rect x="1" y="2" width="9" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M1 5h9" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M3.5 1v2M7.5 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      {prefix}{label}
    </div>
  );
}

/* ── Single task row ── */
function TaskItem({ task, onToggle, onDelete }) {
  const [exiting, setExiting] = React.useState(false);

  const handleDelete = () => {
    setExiting(true);
    setTimeout(() => onDelete(task.id), 280);
  };

  return (
    <div
      className={`task-item${task.done ? ' done' : ''}`}
      style={{
        transform: exiting ? 'translateX(20px)' : 'none',
        opacity:   exiting ? 0 : undefined,
        transition: exiting ? 'all 0.28s ease' : undefined,
        maxHeight: exiting ? 0 : undefined,
        overflow: exiting ? 'hidden' : undefined,
        padding: exiting ? '0 18px' : undefined,
      }}
    >
      {/* Checkbox */}
      <div
        className={`task-checkbox${task.done ? ' checked' : ''}`}
        onClick={() => onToggle(task.id)}
        role="checkbox"
        aria-checked={task.done}
        tabIndex={0}
        onKeyDown={e => e.key === ' ' && onToggle(task.id)}
      >
        <svg className="check-svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Content */}
      <div className="task-content">
        <div className="task-text">{task.text}</div>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:5 }}>
          <DueLabel due={task.due} done={task.done} />
          {task.priority && <PriorityBadge priority={task.priority} />}
        </div>
      </div>

      {/* Delete */}
      <button className="task-delete" onClick={handleDelete} title="Remover">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

/* ── Add task bar ── */
function AddTaskBar({ onAdd }) {
  const { useState, useRef } = React;
  const [text, setText]         = useState('');
  const [priority, setPriority] = useState('medium');
  const [due, setDue]           = useState('');
  const [expanded, setExpanded] = useState(false);

  const submit = () => {
    const t = text.trim();
    if (!t) return;
    onAdd({ id: ++_taskId, text: t, due, done: false, priority });
    setText('');
    setDue('');
    setPriority('medium');
    setExpanded(false);
  };

  return (
    <div style={{ marginBottom:32 }}>
      <div className="add-task-bar">
        <input
          className="task-input"
          placeholder="Novo lembrete…"
          value={text}
          onChange={e => setText(e.target.value)}
          onFocus={() => setExpanded(true)}
          onKeyDown={e => e.key === 'Enter' && submit()}
        />
        <button className="add-btn" onClick={submit} disabled={!text.trim()}>
          + Adicionar
        </button>
      </div>

      {expanded && (
        <div style={{
          display:'flex', gap:12, alignItems:'center',
          padding:'12px 16px',
          background:'var(--card)', border:'1px solid var(--border)',
          borderRadius:'var(--radius-md)', marginTop:-8,
          animation:'fadeInUp 0.2s ease both',
          flexWrap:'wrap',
        }}>
          {/* Priority selector */}
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            <span style={{ fontSize:11, color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em' }}>Prioridade</span>
            {['high','medium','low'].map(p => {
              const labels = { high:'Alta', medium:'Média', low:'Baixa' };
              const active = priority === p;
              const colors = { high:'#e05252', medium:'var(--c-gold)', low:'var(--c-green)' };
              return (
                <button
                  key={p}
                  onClick={() => setPriority(p)}
                  style={{
                    padding:'4px 10px', borderRadius:99,
                    border:`1px solid ${active ? colors[p] : 'var(--border)'}`,
                    background: active ? `${colors[p]}22` : 'transparent',
                    color: active ? colors[p] : 'var(--text-muted)',
                    fontSize:11, fontWeight:600, cursor:'pointer',
                    fontFamily:'var(--font)', transition:'all var(--t-fast)',
                  }}
                >
                  {labels[p]}
                </button>
              );
            })}
          </div>

          {/* Due date */}
          <div style={{ display:'flex', gap:6, alignItems:'center' }}>
            <span style={{ fontSize:11, color:'var(--text-muted)', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.1em' }}>Data</span>
            <input
              type="date"
              value={due}
              min="2026-06-13"
              onChange={e => setDue(e.target.value)}
              style={{
                background:'var(--input-bg)', border:'1px solid var(--border)',
                borderRadius:'var(--radius-sm)', padding:'5px 10px',
                fontFamily:'var(--font)', fontSize:12, color:'var(--text-primary)',
                outline:'none',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main Tasks ── */
function Tasks() {
  const { useState, useEffect } = React;
  const [tasks, setTasks] = useState(() => {
    try {
      const s = sessionStorage.getItem('ctax-tasks');
      return s ? JSON.parse(s) : (window.INITIAL_TASKS || []);
    } catch { return window.INITIAL_TASKS || []; }
  });

  // Persiste na sessão ao navegar entre abas
  useEffect(() => {
    try { sessionStorage.setItem('ctax-tasks', JSON.stringify(tasks)); } catch {}
  }, [tasks]);

  // ── Supabase: carregar dados ao montar (silencioso, não-bloqueante) ──
  useEffect(() => {
    if (!window.SupaDB) return;
    window.SupaDB.read('tasks').then(data => {
      if (!Array.isArray(data)) return;
      setTasks(data);
      try { sessionStorage.setItem('ctax-tasks', JSON.stringify(data)); } catch {}
    });
  }, []);

  const toggle = id => setTasks(ts => {
    const updated = ts.map(t => t.id === id ? { ...t, done:!t.done } : t);
    window.SupaDB && window.SupaDB.write('tasks', updated);
    return updated;
  });
  const remove = id => setTasks(ts => {
    const updated = ts.filter(t => t.id !== id);
    window.SupaDB && window.SupaDB.write('tasks', updated);
    return updated;
  });
  const add = task => setTasks(ts => {
    const updated = [task, ...ts];
    window.SupaDB && window.SupaDB.write('tasks', updated);
    return updated;
  });

  const pending   = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  // Sort pending: overdue first → high priority → medium → low
  const today = new Date(); today.setHours(0,0,0,0);
  const priorityRank = { high:0, medium:1, low:2 };
  const sorted = [...pending].sort((a, b) => {
    const da = a.due ? new Date(a.due + 'T00:00:00') : new Date('9999-01-01');
    const db = b.due ? new Date(b.due + 'T00:00:00') : new Date('9999-01-01');
    const ovA = da < today ? -1 : 0;
    const ovB = db < today ? -1 : 0;
    if (ovA !== ovB) return ovA - ovB;
    return (priorityRank[a.priority] || 2) - (priorityRank[b.priority] || 2);
  });

  return (
    <div className="content-inner">
      <div className="section-header">
        <div className="section-eyebrow">Organização</div>
        <h1 className="section-title">Lembretes <span>&amp; Tarefas</span></h1>
        <p className="section-sub">
          {pending.length} pendente{pending.length !== 1 ? 's' : ''} · {completed.length} concluída{completed.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="tasks-wrap">
        <AddTaskBar onAdd={add} />

        {sorted.length > 0 && (
          <>
            <div className="task-group-label">Pendentes</div>
            <div className="task-list">
              {sorted.map(t => (
                <TaskItem key={t.id} task={t} onToggle={toggle} onDelete={remove} />
              ))}
            </div>
          </>
        )}

        {completed.length > 0 && (
          <>
            <div className="task-group-label">Concluídas</div>
            <div className="task-list">
              {completed.map(t => (
                <TaskItem key={t.id} task={t} onToggle={toggle} onDelete={remove} />
              ))}
            </div>
          </>
        )}

        {tasks.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-muted)' }}>
            <div style={{ fontSize:40, opacity:0.2, marginBottom:12 }}>✓</div>
            <div style={{ fontSize:14, fontWeight:500 }}>Nenhuma tarefa ainda.</div>
          </div>
        )}
      </div>
    </div>
  );
}

window.Tasks = Tasks;
