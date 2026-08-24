# 📖 Minha Estante

Projeto web responsivo, individual, feito com **HTML, CSS e JavaScript puro** (sem frameworks e sem etapa de build).

Um app simples para controlar os livros que você quer ler, está lendo ou já leu — com estatísticas em tempo real, filtros, tema claro/escuro e persistência local (os dados ficam salvos no navegador via `localStorage`).

## Funcionalidades

- Adicionar livros com título, autor e status (Quero ler / Lendo / Lido)
- Alterar o status ou remover um livro diretamente no card
- Filtrar a estante por status
- Contadores automáticos (total de livros, lendo agora, já lidos)
- Alternância entre tema claro e escuro (lembrada entre visitas)
- Layout 100% responsivo: se adapta de celular a desktop
- Dados persistidos no `localStorage` do navegador

## Estrutura do projeto

```
estante-livros/
├── index.html   # Estrutura da página
├── style.css    # Estilos e responsividade
├── script.js    # Interatividade e persistência de dados
└── README.md
```

## Como rodar localmente

Não precisa de instalação nem servidor: basta abrir o `index.html` no navegador,
ou usar a extensão "Live Server" do VS Code, se preferir.

## Como publicar (GitHub + GitHub Pages)

1. Crie um repositório público no GitHub, por exemplo `estante-livros`.
2. Envie os arquivos deste projeto para o repositório:
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit: Minha Estante"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/Minha-Estante.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**.
4. Em "Branch", selecione `main` e a pasta `/ (root)`, depois clique em **Save**.
5. Após alguns instantes, o GitHub mostrará o link público, algo como:
   `https://SEU-USUARIO.github.io/estante-livros/`

Alternativas igualmente válidas: arrastar a pasta do projeto para o
[Netlify Drop](https://app.netlify.com/drop) ou importar o repositório na
[Vercel](https://vercel.com/new) — ambos publicam o site em poucos segundos.

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis CSS, Grid e Flexbox, media queries)
- JavaScript (ES6+), sem dependências externas
