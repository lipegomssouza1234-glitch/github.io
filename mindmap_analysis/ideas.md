# Mapa Mental Funil de Lançamento - Ideias de Design

## Três Abordagens Iniciais

### 1. **Minimalist Flow** | Probabilidade: 0.08
Abordagem limpa e direta, com foco em legibilidade e navegação intuitiva. Design centrado em tipografia forte e espaçamento generoso.

### 2. **Organic Ecosystem** | Probabilidade: 0.07
Inspirado em sistemas naturais, com elementos orgânicos, cores quentes e uma sensação de crescimento. Conexões fluidas entre nós.

### 3. **Modern Hierarchy** | Probabilidade: 0.06
Abordagem contemporânea com gradientes sutis, cards em camadas, e uma hierarquia visual clara através de cores e profundidade.

---

## Design Escolhido: **Modern Hierarchy**

### Design Movement
Inspirado em design systems modernos (Material Design 3, Apple HIG) com toque de sofisticação através de gradientes sutis e profundidade visual.

### Core Principles
1. **Hierarquia Clara**: Cada nível da árvore tem distinção visual clara através de tamanho, cor e profundidade
2. **Interatividade Fluida**: Transições suaves entre estados (expandir, colapsar, marcar como concluído)
3. **Colaboração Transparente**: Indicadores visuais de progresso compartilhado e estado de conclusão
4. **Responsividade Elegante**: Adapta-se perfeitamente de mobile a desktop sem perder sofisticação

### Color Philosophy
- **Primária**: Azul moderno (`#2563eb`) - confiança e profissionalismo
- **Secundária**: Âmbar suave (`#f59e0b`) - progresso e energia
- **Sucesso**: Verde equilibrado (`#10b981`) - conclusão e validação
- **Neutros**: Tons de cinza com toque azulado para profundidade
- **Fundo**: Branco puro com gradiente sutil para profundidade

### Layout Paradigm
Estrutura em árvore vertical com:
- Nó raiz centralizado no topo (Funil de Lançamento)
- Ramificações em cascata para as 7 etapas principais
- Sub-ramificações expandíveis para detalhes
- Barra de progresso visual no topo
- Painel lateral com estatísticas de conclusão

### Signature Elements
1. **Nós Interativos**: Cards com ícones, títulos e indicadores de progresso
2. **Linhas de Conexão**: SVG com gradientes suaves conectando nós
3. **Badges de Progresso**: Pequenos indicadores circulares mostrando % de conclusão
4. **Animações de Transição**: Fade e slide suave ao expandir/colapsar

### Interaction Philosophy
- Clique em qualquer nó para expandir/colapsar
- Clique no checkbox para marcar/desmarcar
- Hover revela ações secundárias (compartilhar, editar)
- Animações confirmam cada ação do usuário
- Estado persistido em localStorage para colaboração simples

### Animation
- **Expandir nó**: Fade in + slide down (200ms, ease-out)
- **Marcar item**: Checkmark com pop animation (150ms)
- **Hover em nó**: Lift effect com sombra aumentada (100ms)
- **Progresso**: Animação de preenchimento de barra (300ms)
- **Transição de cor**: Suave ao mudar estado de conclusão (200ms)

### Typography System
- **Display**: Geist Bold para títulos principais (36px, tracking -0.02em)
- **Heading 1**: Geist SemiBold para etapas (24px)
- **Heading 2**: Geist Medium para sub-etapas (16px)
- **Body**: Inter Regular para descrições (14px, line-height 1.5)
- **Label**: Inter Medium para badges (12px, uppercase, tracking 0.05em)

### Brand Essence
**Posicionamento**: Uma ferramenta colaborativa que transforma um checklist complexo de lançamento em um mapa mental visual, permitindo que equipes acompanhem o progresso em tempo real.

**Personalidade**: Profissional, Intuitivo, Confiável

### Brand Voice
- Headlines: Diretas, orientadas a ação
- CTAs: Claras e motivadoras
- Microcopy: Educativa sem ser condescendente
- Exemplos:
  - "Expanda para ver os detalhes"
  - "Marque conforme avança no funil"

### Wordmark & Logo
Logo: Um símbolo abstrato representando um funil em perspectiva 3D com um checkmark, cores em gradiente azul-âmbar. Sem texto, apenas o símbolo.

### Signature Brand Color
**Azul Profissional**: `#2563eb` - cor primária que aparece em CTAs, progresso e elementos interativos principais

---

## Decisões de Estilo

### Tipografia
- Usar Geist para títulos (importar do Google Fonts)
- Manter Inter para corpo de texto
- Hierarquia clara com 4 níveis de tamanho

### Espaçamento
- Grid de 8px para consistência
- Padding interno dos cards: 16px
- Gap entre elementos: 12px
- Margem entre seções: 24px

### Sombras
- Sombra leve (hover): `0 4px 12px rgba(0,0,0,0.08)`
- Sombra média (cards): `0 2px 8px rgba(0,0,0,0.06)`
- Sombra forte (modais): `0 20px 25px rgba(0,0,0,0.15)`

### Raio de Borda
- Cards: 12px
- Botões: 8px
- Badges: 6px

### Transições
- Padrão: 200ms ease-out
- Rápida: 100ms ease-out
- Lenta: 300ms ease-out
