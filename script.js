/* =========================================================
   Minha Estante — lógica da aplicação
   - Adicionar / remover / atualizar status de livros
   - Filtrar por status
   - Estatísticas em tempo real
   - Persistência em localStorage
   - Alternância de tema claro/escuro
   ========================================================= */

const STORAGE_KEY = "minha-estante-livros";
const THEME_KEY = "minha-estante-tema";

const form = document.getElementById("bookForm");
const grid = document.getElementById("bookGrid");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");
const themeToggle = document.getElementById("themeToggle");

const statTotal = document.getElementById("statTotal");
const statLendo = document.getElementById("statLendo");
const statLidos = document.getElementById("statLidos");

let books = loadBooks();
let currentFilter = "todos";

const STATUS_LABELS = {
  "quero-ler": "Quero ler",
  "lendo": "Lendo",
  "lido": "Lido",
};

/* ---------- Persistência ---------- */

function loadBooks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("Não foi possível ler os dados salvos:", err);
    return [];
  }
}

function saveBooks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
}

/* ---------- Renderização ---------- */

function render() {
  const visibleBooks =
    currentFilter === "todos"
      ? books
      : books.filter((b) => b.status === currentFilter);

  grid.innerHTML = "";

  emptyState.hidden = visibleBooks.length !== 0;

  visibleBooks.forEach((book) => {
    grid.appendChild(createBookCard(book));
  });

  updateStats();
}

function createBookCard(book) {
  const card = document.createElement("article");
  card.className = "book-card";
  card.dataset.status = book.status;

  card.innerHTML = `
    <div class="book-card__spine" aria-hidden="true"></div>
    <h3 class="book-card__title"></h3>
    <p class="book-card__author"></p>
    <div class="book-card__footer">
      <select class="status-select" aria-label="Alterar status do livro">
        ${Object.entries(STATUS_LABELS)
          .map(
            ([value, label]) =>
              `<option value="${value}" ${value === book.status ? "selected" : ""}>${label}</option>`
          )
          .join("")}
      </select>
      <button type="button" class="remove-btn" aria-label="Remover livro">Remover</button>
    </div>
  `;

  // Usamos textContent (em vez de innerHTML) para título/autor,
  // evitando problemas com caracteres especiais e injeção de HTML.
  card.querySelector(".book-card__title").textContent = book.title;
  card.querySelector(".book-card__author").textContent = book.author;

  card.querySelector(".status-select").addEventListener("change", (e) => {
    book.status = e.target.value;
    saveBooks();
    render();
  });

  card.querySelector(".remove-btn").addEventListener("click", () => {
    books = books.filter((b) => b.id !== book.id);
    saveBooks();
    render();
  });

  return card;
}

function updateStats() {
  statTotal.textContent = books.length;
  statLendo.textContent = books.filter((b) => b.status === "lendo").length;
  statLidos.textContent = books.filter((b) => b.status === "lido").length;
}

/* ---------- Formulário ---------- */

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const status = document.getElementById("status").value;

  if (!title || !author) return;

  books.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    title,
    author,
    status,
  });

  saveBooks();
  form.reset();
  document.getElementById("title").focus();
  render();
});

/* ---------- Filtros ---------- */

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

/* ---------- Tema claro/escuro ---------- */

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.querySelector("span").textContent = theme === "dark" ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, theme);
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") || "light";
  applyTheme(current === "dark" ? "light" : "dark");
});

/* ---------- Inicialização ---------- */

(function init() {
  const savedTheme =
    localStorage.getItem(THEME_KEY) ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  // Dados de exemplo na primeira visita, só para o usuário ver a interface funcionando.
  if (books.length === 0) {
    books = [
      { id: "seed-1", title: "Dom Casmurro", author: "Machado de Assis", status: "lido" },
      { id: "seed-2", title: "A Hora da Estrela", author: "Clarice Lispector", status: "lendo" },
      { id: "seed-3", title: "Torto Arado", author: "Itamar Vieira Junior", status: "quero-ler" },
    ];
    saveBooks();
  }

  render();
})();
