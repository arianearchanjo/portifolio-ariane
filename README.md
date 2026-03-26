# { ariane } — Portfólio Pessoal

Site de portfólio pessoal desenvolvido com HTML, CSS e JavaScript puro — sem frameworks, sem dependências de build.

## ✦ Acesso

> 🔗 **https://arianearchanjo.github.io/portifolio-ariane/** 

---

## Estrutura

```
portfolio/
├── index.html      # Estrutura e conteúdo
├── style.css       # Estilos, tema dark/light, responsividade
├── script.js       # Interatividade e animações
└── README.md
```

---

## Seções

| Seção | Conteúdo |
|---|---|
| **Hero** | Apresentação, typed text animado e stats |
| **Sobre** | Resumo profissional e informações de contato |
| **Skills** | Stack técnica com barras de progresso animadas |
| **Projetos** | Cards dos projetos com tecnologias e links |
| **Experiência** | Timeline de estágios, formação e destaques |
| **Cursos** | Lista completa de cursos concluídos e em andamento |
| **Contato** | Links para LinkedIn, GitHub e e-mail |

---

## Funcionalidades

- **Dark / Light mode** com persistência via `localStorage`
- **Cursor personalizado** com efeito de seguimento suave
- **Typed text** no hero com rotação de frases
- **Animações reveal** ao rolar a página (Intersection Observer)
- **Barras de skill** que animam ao entrar na viewport
- **Contadores** animados com easing nas estatísticas
- **Navbar** com highlight da seção ativa durante o scroll
- **Menu mobile** com hamburguer e overlay
- **Efeito tilt 3D** nos cards de projeto (apenas desktop)
- **Smooth scroll** para todas as âncoras
- **Layout responsivo** mobile-first

---

## Tecnologias

- HTML5 semântico
- CSS3 — variáveis, Grid, Flexbox, animações
- JavaScript ES6+ — sem jQuery, sem frameworks
- [Google Fonts](https://fonts.google.com) — Syne + DM Mono
- [Font Awesome 6](https://fontawesome.com) — ícones

---

## Como rodar localmente

Sem dependências, sem build. Só abrir com Live Server:

```bash
# Clone o repositório
git clone https://github.com/arianearchanjo/portfolio.git
cd portfolio

# Abra index.html com Live Server no VSCode
# ou sirva com qualquer servidor estático
```

> Não abra o `index.html` diretamente pelo explorador de arquivos — use o Live Server para evitar problemas com fontes e scripts.

---

## Personalização

As cores principais ficam nas variáveis CSS no topo do `style.css`:

```css
:root {
  --red:      #e8192c;   /* cor de destaque */
  --bg:       #0a0a0b;   /* fundo dark */
  --text:     #d4d4d8;   /* texto padrão */
  --text-head:#f5f5f7;   /* títulos */
}
```

---

## Contato

[![LinkedIn](https://img.shields.io/badge/LinkedIn-ariane--archanjo-0a66c2?style=flat&logo=linkedin)](https://www.linkedin.com/in/ariane-archanjo/)
[![GitHub](https://img.shields.io/badge/GitHub-arianearchanjo-181717?style=flat&logo=github)](https://github.com/arianearchanjo)
[![Gmail](https://img.shields.io/badge/Gmail-ariane.archanjo1%40gmail.com-ea4335?style=flat&logo=gmail)](mailto:ariane.archanjo1@gmail.com)

---

<sub>Desenvolvido por Ariane Archanjo · 2026</sub>
