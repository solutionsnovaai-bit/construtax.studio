/* ============================================================
   CONSTRUTAX STUDIO — DATA v3
   Junho: 6 posts (aquecimento reforçado, dias 14-30)
   Julho: 14 posts redistribuídos (Seg/Qua/Sex incluídos)
   Agosto e Setembro: completamente vazios — células clicáveis
   ============================================================ */

const POSTS_DATA = [
  // ── JUNHO 2026 — Aquecimento (6 posts, ~2/semana)
  {
    date: '2026-06-20', format: 'Reels', pilar: 'rosto', pilarLabel: 'Rosto e Confiança',
    title: 'Quem é a CONSTRUTAX e pra quem ela serve',
    description: 'Rachel apresenta a CONSTRUTAX pela primeira vez ao público: quem são, quem atendem (construtoras e incorporadoras), o que entregam. Vídeo de abertura de canal — emocional, concreto e sem teleprompter.',
    funnel: 'Topo — Apresentação e reconhecimento',
    cta: 'Segue pra acompanhar tudo que vem por aí.'
  },
  {
    date: '2026-06-22', format: 'Feed', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'A Reforma Tributária chegou. E os seus contratos?',
    description: 'Post de abertura de autoridade: a Reforma Tributária é real, está em vigor e os contratos de 2026 precisam ser revistos. Post âncora que posiciona a CONSTRUTAX como referência no tema.',
    funnel: 'Topo — Reconhecimento do problema',
    cta: 'Salva esse post: é o ponto de partida pra entender o que muda.'
  },
  {
    date: '2026-06-24', format: 'Feed', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: '3 perguntas que todo construtor deveria fazer sobre seus contratos',
    description: 'Post de alto salvamento: lista as 3 perguntas críticas que todo construtor e incorporador deveria fazer sobre seus contratos hoje — e que a maioria não faz. Direto, provocativo, compartilhável.',
    funnel: 'Topo/Meio — Reconhecimento e engajamento',
    cta: 'Você sabe responder essas 3? Comenta abaixo.'
  },
  {
    date: '2026-06-23', format: 'Reels', pilar: 'rosto', pilarLabel: 'Rosto e Confiança',
    title: 'Posso usar meu contrato de empreitada como sempre fiz?',
    description: 'Rachel questiona o modelo tradicional de contrato de empreitada frente às mudanças tributárias de 2026. Formato curto (45–60s), gancho nos primeiros 2 segundos. Ambiente real de escritório.',
    funnel: 'Topo — Reconhecimento e alcance',
    cta: 'Salva esse vídeo pra revisitar quando fechar seu próximo contrato.'
  },
  {
    date: '2026-06-26', format: 'Feed', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'O que é o RET e por que importa pra incorporadora',
    description: 'Post explicativo sobre o Regime Especial de Tributação: alíquota unificada de 4%, requisitos, vantagens na fase de transição 2026–2033. Imagem limpa com infográfico de comparação.',
    funnel: 'Meio — Educação e consideração',
    cta: 'Comenta abaixo: sua incorporadora já está no RET?'
  },
  {
    date: '2026-06-30', format: 'Story', pilar: 'conversa', pilarLabel: 'Conversa e Engajamento',
    title: 'Caixinha: Qual tipo de contrato mais te preocupa?',
    description: 'Story interativo com caixinha de perguntas. Objetivo: coletar dúvidas reais do público para informar a pauta de julho. Os dados coletados viram conteúdo.',
    funnel: 'Topo — Engajamento e escuta ativa',
    cta: 'Manda sua dúvida na caixinha ↑'
  },

  // ── JULHO 2026 — Ritmo pleno (14 posts redistribuídos)
  // Semana 1: Qua + Sex
  {
    date: '2026-07-01', format: 'Carrossel', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'O que muda nos seus contratos em 2026?',
    description: 'Carrossel de 7 slides mapeando as principais mudanças contratuais da Reforma Tributária: IBS, CBS, cláusula de reequilíbrio, período de transição. Conteúdo denso e compartilhável.',
    funnel: 'Meio — Educação profunda',
    cta: 'Compartilha com quem precisa saber disso ontem.'
  },
  {
    date: '2026-07-03', format: 'Reels', pilar: 'rosto', pilarLabel: 'Rosto e Confiança',
    title: 'IBS e CBS vão aumentar meus impostos?',
    description: 'Rachel responde à pergunta mais frequente de forma direta. A resposta é "depende" — e o vídeo explica por quê, criando desejo pelo diagnóstico personalizado.',
    funnel: 'Topo/Meio — Reconhecimento e conexão com Rachel',
    cta: 'Segue pra não perder a continuação dessa série.'
  },
  // Semana 2: Ter + Qui + Sáb
  {
    date: '2026-07-07', format: 'Feed', pilar: 'isca', pilarLabel: 'Isca e Conversão',
    title: 'Checklist gratuito: Mapa de Risco Contratual',
    description: 'Lançamento do primeiro material rico. Post âncora de conversão com visual do checklist e CTA para o link na bio. Isca que qualifica o lead: só quem tem contratos em jogo vai baixar.',
    funnel: 'Fundo — Conversão de lead qualificado',
    cta: 'Link na bio: baixe gratuitamente.'
  },
  {
    date: '2026-07-09', format: 'Carrossel', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'Patrimônio de afetação: a proteção que muita gente ignora',
    description: 'Explicação técnica sobre como o Patrimônio de Afetação protege o empreendimento e os compradores, com implicações no RET. Alta potência de salvamento.',
    funnel: 'Meio — Educação e posicionamento de autoridade',
    cta: 'Salva esse carrossel: você vai precisar consultá-lo.'
  },
  {
    date: '2026-07-11', format: 'Story', pilar: 'conversa', pilarLabel: 'Conversa e Engajamento',
    title: 'Enquete: Você já revisou seus contratos pós-Reforma?',
    description: 'Story com enquete: "Sim, revisamos tudo" vs "Ainda não, preciso disso". Qualifica o público e gera dados para estratégia. Resultados informam próximo post de autoridade.',
    funnel: 'Topo — Engajamento e segmentação',
    cta: 'Vota e vê o resultado na próxima história.'
  },
  // Semana 3: Ter + Qua + Sex
  {
    date: '2026-07-14', format: 'Reels', pilar: 'rosto', pilarLabel: 'Rosto e Confiança',
    title: 'O erro mais caro em contrato de permuta',
    description: 'Rachel revela o erro mais comum em contratos de permuta: ausência de cláusula de ajuste tributário. Vídeo de alta urgência percebida.',
    funnel: 'Meio/Fundo — Consideração e urgência',
    cta: 'Você comete esse erro? Arrasta pra ver.'
  },
  {
    date: '2026-07-15', format: 'Feed', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'Transição 2026–2033: o dado que todo construtor devia saber',
    description: 'Post com gráfico da curva de transição tributária: como o IBS/CBS entra gradualmente e o que isso significa para contratos firmados hoje. Visual de impacto, dado concreto.',
    funnel: 'Meio — Educação estratégica e senso de urgência',
    cta: 'Esse dado muda como você precifica hoje. Compartilha.'
  },
  {
    date: '2026-07-17', format: 'Feed', pilar: 'isca', pilarLabel: 'Isca e Conversão',
    title: 'Ebook: O Tributo Mudou. Seu Contrato Também.',
    description: 'Lançamento do ebook completo sobre impactos da Reforma Tributária em contratos. Post de lançamento com visual premium do material. Alto valor percebido.',
    funnel: 'Fundo — Conversão de lead e autoridade máxima',
    cta: 'Baixe gratuitamente: link na bio.'
  },
  // Semana 4: Seg + Qua + Sex + Seg (aceleração)
  {
    date: '2026-07-20', format: 'Carrossel', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'Cláusula de reequilíbrio: quem paga a conta da Reforma?',
    description: 'Carrossel técnico sobre a cláusula de reequilíbrio econômico-financeiro em contratos de construção. Como redigir, o que incluir, o que evitar.',
    funnel: 'Meio/Fundo — Educação avançada e conversão',
    cta: 'Quer que a CONSTRUTAX revise seus contratos? Link na bio.'
  },
  {
    date: '2026-07-22', format: 'Reels', pilar: 'rosto', pilarLabel: 'Rosto e Confiança',
    title: 'Quem é a CONSTRUTAX e pra quem serve',
    description: 'Rachel apresenta a CONSTRUTAX diretamente: quem são, quem atendem, o que entregam. Vídeo de marca, emocional e concreto. Ambiente real de escritório.',
    funnel: 'Topo/Fundo — Reconhecimento e conversão direta',
    cta: 'Conhece alguém que precisa da CONSTRUTAX? Marca nos comentários.'
  },
  {
    date: '2026-07-24', format: 'Feed', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'SPE e SCP: a estrutura certa pro seu empreendimento',
    description: 'Post que explica SPE (Sociedade de Propósito Específico) e SCP. Quando cada estrutura vale, impactos tributários e o que muda com a Reforma.',
    funnel: 'Meio/Fundo — Educação e conversão',
    cta: 'Comenta qual estrutura sua empresa usa hoje.'
  },
  {
    date: '2026-07-28', format: 'Feed', pilar: 'isca', pilarLabel: 'Isca e Conversão',
    title: '"Reúna seus 3 contratos mais relevantes" (CTA diagnóstico)',
    description: 'Post de CTA direto para o diagnóstico contratual gratuito. Cria comprometimento e qualifica o lead antes da conversa.',
    funnel: 'Fundo — Conversão para diagnóstico',
    cta: 'Agende seu diagnóstico contratual gratuito: link na bio.'
  },
  // Semana 5: Qui + Sex
  {
    date: '2026-07-30', format: 'Feed', pilar: 'autoridade', pilarLabel: 'Autoridade Técnica',
    title: 'O contrato é uma ferramenta de gestão de risco',
    description: 'Post reflexivo de encerramento de julho. Posicionamento estratégico: o contrato bem redigido não é burocracia, é blindagem financeira.',
    funnel: 'Topo/Meio — Posicionamento e autoridade de marca',
    cta: 'Concorda? Salva esse post como lembrete.'
  },
  {
    date: '2026-07-31', format: 'Reels', pilar: 'rosto', pilarLabel: 'Rosto e Confiança',
    title: 'Rachel responde dúvida da caixinha',
    description: 'Rachel responde ao vivo a principal dúvida recebida na caixinha do dia 30/06. Conteúdo gerado pela própria audiência — alta taxa de retenção.',
    funnel: 'Topo — Engajamento e prova de escuta',
    cta: 'Sua dúvida vai ser a próxima. Manda na caixinha da bio.'
  },

  // ── AGOSTO e SETEMBRO: completamente vazios
  // Sem posts predefinidos — o usuário preenche pelo calendário interativo.
];

/* ── Lookup por data ── */
const POSTS_BY_DATE = {};
POSTS_DATA.forEach(p => { POSTS_BY_DATE[p.date] = p; });

/* ── Meses disponíveis ── */
const CALENDAR_MONTHS = [
  { year: 2026, month: 5, label: 'Junho 2026' },
  { year: 2026, month: 6, label: 'Julho 2026' },
  { year: 2026, month: 7, label: 'Agosto 2026' },
  { year: 2026, month: 8, label: 'Setembro 2026' },
];

/* ── Métricas — posts planejados = count real ── */
const METRICS = [
  { label: 'Posts Planejados', value: POSTS_DATA.length, trend: 'Jun–Jul 2026' },
  { label: 'Posts Publicados', value: 0, trend: 'Iniciando em breve' },
  { label: 'Alcance',          value: 0, suffix: '', trend: 'Dados em breve' },
  { label: 'Engajamento',      value: 0, suffix: '%', trend: 'Dados em breve' },
];

/* ── Gráfico de atividade — plataforma nova (flat) ── */
const CHART_DATA = new Array(30).fill(0);

/* ── Tarefas iniciais ── */
const INITIAL_TASKS = [
  { id: 1, text: 'Gravar reel de abertura com Rachel (15/06)', due: '2026-06-14', done: false, priority: 'high' },
  { id: 2, text: 'Validar legenda do post 17/06 (Reforma)', due: '2026-06-15', done: false, priority: 'high' },
  { id: 3, text: 'Configurar link na bio com checklist (para 07/07)', due: '2026-07-05', done: false, priority: 'medium' },
  { id: 4, text: 'Preparar story caixinha para 30/06', due: '2026-06-28', done: false, priority: 'medium' },
  { id: 5, text: 'Criar brief para posts de Agosto', due: '2026-07-25', done: false, priority: 'low' },
  { id: 6, text: 'Agendar sessão de gravação com Rachel — julho', due: '2026-07-01', done: false, priority: 'medium' },
];

/* ============================================================
   AI RESPONSES — Substituir getAIResponse() pela API real
   ============================================================ */
const AI_RESPONSES = {
  ret: `**RET (Regime Especial de Tributação)** é uma das ferramentas mais poderosas para incorporadoras — e uma das mais mal compreendidas.\n\n**Por que você deveria estar falando sobre isso agora:**\nO RET permite alíquota unificada de 4% sobre a receita bruta da incorporação, substituindo IR, CSLL, PIS e COFINS separados. Com a Reforma Tributária em transição até 2033, quem entrou no RET hoje ainda opera sob as regras atuais durante o período — uma janela de oportunidade que muitas incorporadoras ignoram por desconhecimento.\n\n**Sugestão de conteúdo:**\n→ "RET: por que sua incorporadora deveria olhar pra isso antes de 2027" — carrossel Autoridade, 5–6 slides\n→ "RET na prática: como calculo os 4% no dia a dia" — reel Rachel, 60s`,

  reforma: `**A Reforma Tributária (LC 214/2025)** é o maior redesenho tributário do Brasil em décadas. Para construtoras e incorporadoras, os impactos são específicos e urgentes.\n\n**O que muda de verdade:**\nIBS e CBS substituem ICMS, ISS, PIS e COFINS no período de transição 2026–2033. Contratos firmados antes do marco transitório operam sob a regra velha. Contratos novos sob regra nova. Isso cria risco real em contratos de longo prazo.\n\n**Próximos posts sugeridos:**\n→ "Transição 2026–2033: o gráfico que todo construtor precisa ver" — feed visual\n→ "Meu contrato de hoje vale no regime novo?" — reel Rachel`,

  contratos: `**Contratos de empreitada e permuta** são seus dois temas de maior potencial de engajamento e conversão.\n\n**Empreitada:** construtores usam esse modelo há décadas sem revisar as cláusulas. Conteúdo que identifica erros comuns gera alto salvamento e compartilhamento.\n\n**Permuta:** operação frequente em incorporação, pouco compreendida, com risco tributário alto se mal estruturada.\n\n**Posts sugeridos:**\n→ "3 cláusulas que todo contrato de empreitada precisa ter" — carrossel Autoridade\n→ "Permuta com torna: quando o imposto explode" — reel Rachel`,

  conteudo: `**Sugestão de pauta — semana atual:**\n\n🟢 **Autoridade Técnica**\n"A Reforma Tributária chegou. E os seus contratos?" — feed, imagem limpa com dados. Post âncora de abertura.\n\n🟩 **Rosto/Rachel**\nReel de 45–60s respondendo a pergunta mais frequente recebida. Formato: direto ao ponto, sem teleprompter, fundo de escritório. Gancho nos primeiros 2s.\n\n⬛ **Isca**\nPreview do Checklist de Mapa de Risco Contratual — criar expectativa antes do lançamento oficial em 07/07.\n\n**Evitar:** posts genéricos sobre "Reforma Tributária" sem ângulo específico — tema saturado nos feeds. Prefira ângulos concretos: "o que muda no SEU contrato". Especificidade = autoridade.`,

  default: `**ConstrutaxPRO** aqui. Sou especializado em estratégia de conteúdo para gestão tributária e contratual na construção civil.\n\n**Posso te ajudar com:**\n→ Sugestões de temas e ângulos para a semana\n→ Roteiros para reels da Rachel (gancho, corpo, CTA)\n→ Qual pilar priorizar com base no funil atual\n→ Legendas e CTAs otimizados para o nicho\n\n**Tente perguntar:**\n"Sugira temas quentes para esta semana"\n"Crie um roteiro de reel sobre RET"\n"O que priorizo entre autoridade e conversão agora?"`
};

async function getAIResponse(query) {
  await new Promise(r => setTimeout(r, 1200 + Math.random() * 1200));
  const q = (query || '').toLowerCase();
  if (q.includes('ret') || q.includes('regime especial') || q.includes('alíquota')) return AI_RESPONSES.ret;
  if (q.includes('reform') || q.includes('ibs') || q.includes('cbs') || q.includes('transição')) return AI_RESPONSES.reforma;
  if (q.includes('permuta') || q.includes('empreit') || q.includes('contrat')) return AI_RESPONSES.contratos;
  if (q.includes('tema') || q.includes('conteúdo') || q.includes('reel') || q.includes('post') || q.includes('sugest') || q.includes('semana') || q.includes('pauta')) return AI_RESPONSES.conteudo;
  return AI_RESPONSES.default;
}

Object.assign(window, {
  POSTS_DATA, POSTS_BY_DATE, CALENDAR_MONTHS,
  METRICS, CHART_DATA, INITIAL_TASKS,
  getAIResponse, AI_RESPONSES,
});
