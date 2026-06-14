# CONSTRUTAX Studio

**Central de comando de conteúdo editorial para a CONSTRUTAX** — plataforma de planejamento, calendário e estratégia para Instagram, Facebook e LinkedIn.

---

## O que é

CONSTRUTAX Studio é uma plataforma web estática (HTML + CSS + React via CDN) que centraliza:

- **Dashboard** — visão geral com métricas, próximos posts e acesso rápido
- **Calendário Editorial** — planejamento mensal interativo (Jun–Set 2026) com posts por pilar, drawer de detalhes, marcar como publicado, editar e remover
- **ConstrutaxPRO** — portal de acesso ao Gem de IA do Google Gemini, especializado em Reforma Tributária e estratégia de conteúdo para construção civil
- **Lembretes** — lista de tarefas com prioridade, prazo e persistência de sessão

Funciona sem build — é um site estático puro.

---

## Como rodar localmente

Basta servir os arquivos com qualquer servidor HTTP local. Opções:

**Python (nativo):**
```bash
python3 -m http.server 3000
# Acesse: http://localhost:3000
```

**Node.js (npx):**
```bash
npx serve .
# Acesse: http://localhost:3000
```

**VS Code:** instale a extensão **Live Server** e clique em "Go Live".

> ⚠️ Não abra o `index.html` direto pelo sistema de arquivos (`file://`). Os assets de logo não carregarão corretamente. Use sempre um servidor HTTP local.

---

## Estrutura do projeto

```
construtax-studio/
├── index.html              ← Ponto de entrada (deploy)
├── Construtax Studio.html  ← Arquivo de desenvolvimento
│
├── App.jsx                 ← Componente raiz React
├── LoadScreen.jsx          ← Tela de carregamento
├── Sidebar.jsx             ← Navegação lateral (desktop)
├── Dashboard.jsx           ← Aba Dashboard
├── Calendar.jsx            ← Aba Calendário editorial
├── Assistant.jsx           ← Aba ConstrutaxPRO (portal Gem)
├── Tasks.jsx               ← Aba Lembretes
│
├── data.js                 ← Posts, métricas e tarefas iniciais
├── canvas.js               ← Partículas atmosféricas (Canvas 2D)
├── gsap-animations.js      ← Animações de scroll (GSAP)
│
├── tokens.css              ← Design tokens (cores, tipografia, espaçamentos)
├── app.css                 ← Estilos globais e componentes
│
└── assets/
    ├── logo-dark.png       ← Logo para modo escuro
    ├── logo-light.png      ← Logo para modo claro
    └── logo-3d.png         ← Logo 3D para tela de carregamento
```

---

## Deploy

### Vercel (recomendado — automático)

1. Suba o repositório no GitHub
2. Acesse [vercel.com](https://vercel.com) → **Add New Project** → importe o repositório
3. Framework: **Other** (site estático)
4. Output directory: `.` (raiz)
5. Clique em **Deploy** — pronto ✓

### GitHub Pages

1. Suba o repositório no GitHub
2. Vá em **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main` → pasta `/` (root)
4. Clique em **Save**
5. Aguarde 1–2 minutos → acesse o link gerado ✓

> O arquivo `index.html` na raiz é necessário para ambos os deploys. Ele já está incluído no projeto.

---

## Dependências externas (CDN)

Nenhuma dependência local. Tudo carrega via CDN:

| Biblioteca | Versão | Fonte |
|---|---|---|
| React | 18.3.1 | unpkg.com |
| React DOM | 18.3.1 | unpkg.com |
| Babel Standalone | 7.29.0 | unpkg.com |
| GSAP + ScrollTrigger | 3.12.5 | cdn.jsdelivr.net |
| Montserrat | — | fonts.googleapis.com |

---

## Personalização

- **Posts do calendário:** edite `data.js` → array `POSTS_DATA`
- **Métricas do dashboard:** edite `data.js` → array `METRICS`
- **Lembretes iniciais:** edite `data.js` → array `INITIAL_TASKS`
- **Cores e tokens:** edite `tokens.css`
- **Link do ConstrutaxPRO:** edite `Assistant.jsx` → constante `GEM_URL`

---

## Segurança

- Sem chaves de API, tokens ou segredos expostos no código
- O ConstrutaxPRO é acessado via link público externo (Google Gemini)
- Sem backend, sem banco de dados — estado persiste apenas em `sessionStorage`
