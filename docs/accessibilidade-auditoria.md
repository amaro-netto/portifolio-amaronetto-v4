# Auditoria de Acessibilidade (WCAG 2.1 AA)

Data: 2026-02-25

## Escopo
- Página inicial (`/`) do portfólio.
- Avaliação manual de semântica, navegação por teclado, nomes acessíveis e práticas de interação.
- Varredura automatizada com `axe-core` via Playwright (tags WCAG A/AA).

## Como foi avaliado
1. Inspeção de código dos principais componentes de interface.
2. Teste rápido de teclado (Tab + Enter) para validar fluxo de *skip link*.
3. Varredura automatizada com `axe-core` em runtime.

## Resultado executivo
- ✅ **Pontos fortes**
  - `lang="pt-BR"` definido no documento HTML.
  - Existe *skip link* funcional para pular ao conteúdo principal.
  - Estrutura de headings começa em `h1` e segue com seções claras (`h2`/`h3`).
  - Elementos interativos visíveis encontrados com nome acessível.
- ⚠️ **Pontos de atenção**
  - 1 violação automática de contraste (botão primário do Hero).
  - Alguns padrões podem melhorar robustez para leitores de tela e teclado.

## Achados detalhados

### 1) Contraste insuficiente no botão primário do Hero (Alta)
**Tipo:** WCAG 1.4.3 (Contraste mínimo)

- O `axe-core` detectou contraste **3.04:1** (texto branco em fundo azul) no botão “Ver Portfólio”, abaixo de 4.5:1 para texto normal.
- Classe alvo apontada na análise: `.hover\\:shadow-glow` (botão do Hero).

**Impacto:** leitura prejudicada para pessoas com baixa visão em condições de brilho comum.

**Recomendação:** escurecer o fundo do botão, aumentar contraste do texto/estado base, ou elevar peso/tamanho conforme critério aplicável.

---

### 2) Botão de menu mobile sem estado expandido explícito (Média)
**Tipo:** WCAG 4.1.2 (Nome, Função, Valor)

- O botão de abrir/fechar menu tem `aria-label`, mas pode ficar mais robusto com:
  - `aria-expanded={isMenuOpen}`
  - `aria-controls="id-do-menu-mobile"`
- Isso ajuda tecnologias assistivas a entenderem o estado atual do menu.

**Impacto:** menor previsibilidade da interação para usuários de leitor de tela.

---

### 3) Abertura de links externos via `window.open` em botões (Média)
**Tipo:** Usabilidade/A11y + segurança de navegação

- Em redes sociais e ações de projeto, a navegação externa ocorre por `window.open(..., '_blank')` em `<Button onClick>`, em vez de links `<a>`.
- Funciona, mas perde comportamentos nativos de link (menu contextual, copiar URL, semântica natural de navegação) e pode confundir alguns fluxos assistivos.

**Recomendação:** preferir `<a href="..." target="_blank" rel="noopener noreferrer">` estilizado como botão.

---

### 4) Imagens de projeto com `alt=""` mesmo em contexto informativo (Baixa)
**Tipo:** WCAG 1.1.1 (Conteúdo não textual)

- Em cartões/modais de projetos, algumas imagens têm `alt=""`.
- Se forem puramente decorativas, está correto. Se representam o projeto (conteúdo informativo), convém descrever brevemente.

**Recomendação:** usar `alt` descritivo quando a imagem agrega contexto do projeto (ex.: `Screenshot do projeto X`).

## Checklist rápido de melhorias sugeridas
- [ ] Ajustar contraste do botão primário do Hero para >= 4.5:1.
- [ ] Adicionar `aria-expanded` + `aria-controls` no botão do menu mobile.
- [ ] Migrar ações externas de `window.open` para `<a>` semântico com `rel`.
- [ ] Revisar `alt` de imagens do portfólio (decorativa vs informativa).

## Evidências de execução
- `npm run lint` → falhou por erros de TypeScript/ESLint pré-existentes (não relacionados diretamente à auditoria de acessibilidade).
- Script Playwright + `axe-core` → 1 violação (`color-contrast`).
- Script Playwright de teclado → skip link focou e levou corretamente para `#main-content`.
