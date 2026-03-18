/* =============================================
   ADMIN PANEL — publications manager
   Injetado dinamicamente no portfólio.
   Ativação: triple-click no h2 de Publicações.
   ============================================= */

function initAdmin() {
  // ── Triple-click secret trigger ──
  const pubTitle = document.querySelector("#publications .section-title");
  if (!pubTitle) return;

  let clickCount = 0;
  let clickTimer = null;

  pubTitle.addEventListener("click", () => {
    clickCount++;
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 600);

    if (clickCount >= 3) {
      clickCount = 0;
      showPasswordPrompt();
    }
  });
}

// ── Tela de senha ──
function showPasswordPrompt() {
  if (document.getElementById("admin-overlay")) return; // já aberto

  const overlay = document.createElement("div");
  overlay.id = "admin-overlay";
  overlay.innerHTML = `
      <div class="adm-modal" id="adm-modal">
        <div class="adm-header">
          <span class="adm-logo">OK<span>.dev</span></span>
          <button class="adm-close" id="adm-close-pw">✕</button>
        </div>
        <div class="adm-body">
          <p class="adm-label">// acesso restrito</p>
          <h2 class="adm-title">Painel Admin</h2>
          <p class="adm-hint">Digite a senha para gerenciar publicações.</p>
          <div class="adm-field">
            <input type="password" id="adm-pw-input" placeholder="Senha" autocomplete="current-password" />
            <button class="adm-btn-primary" id="adm-pw-submit">Entrar →</button>
          </div>
          <p class="adm-error hidden" id="adm-pw-error">Senha incorreta.</p>
        </div>
      </div>
    `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("adm-open"));

  const input = overlay.querySelector("#adm-pw-input");
  const submit = overlay.querySelector("#adm-pw-submit");
  const error = overlay.querySelector("#adm-pw-error");
  const close = overlay.querySelector("#adm-close-pw");

  input.focus();

  function tryLogin() {
    if (input.value === window.__PUB.ADMIN_PASSWORD) {
      overlay.remove();
      showAdminPanel();
    } else {
      error.classList.remove("hidden");
      input.value = "";
      input.focus();
    }
  }

  submit.addEventListener("click", tryLogin);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") tryLogin();
  });
  close.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
}

// ── Painel principal ──
function showAdminPanel() {
  const overlay = document.createElement("div");
  overlay.id = "admin-overlay";

  overlay.innerHTML = `
      <div class="adm-modal adm-panel" id="adm-modal">
        <div class="adm-header">
          <span class="adm-logo">OK<span>.dev</span> <span class="adm-badge">admin</span></span>
          <button class="adm-close" id="adm-close-panel">✕</button>
        </div>
  
        <div class="adm-panel-body">
  
          <!-- Lista de posts -->
          <div class="adm-col">
            <div class="adm-col-header">
              <h3 class="adm-col-title">Publicações</h3>
              <button class="adm-btn-primary adm-btn-sm" id="adm-new-btn">+ Nova</button>
            </div>
            <div class="adm-post-list" id="adm-post-list"></div>
          </div>
  
          <!-- Formulário -->
          <div class="adm-col adm-form-col" id="adm-form-col">
            <h3 class="adm-col-title" id="adm-form-title">Nova Publicação</h3>
  
            <div class="adm-field-group">
              <label class="adm-field-label">Título *</label>
              <input type="text" class="adm-input" id="adm-f-title" placeholder="Ex: Explorando TypeScript..." maxlength="100" />
            </div>
  
            <div class="adm-field-group">
              <label class="adm-field-label">Descrição *</label>
              <textarea class="adm-input adm-textarea" id="adm-f-desc" placeholder="Resumo do post..." maxlength="400" rows="4"></textarea>
              <span class="adm-counter"><span id="adm-f-desc-count">0</span>/400</span>
            </div>
  
            <div class="adm-field-group">
              <label class="adm-field-label">Tags <span class="adm-hint-inline">(separadas por vírgula)</span></label>
              <input type="text" class="adm-input" id="adm-f-tags" placeholder="Ex: TypeScript, Backend, Java" />
            </div>
  
            <div class="adm-field-group">
              <label class="adm-field-label">Data</label>
              <input type="text" class="adm-input" id="adm-f-date" placeholder="Ex: Mar 2026" maxlength="20" />
            </div>
  
            <div class="adm-field-group">
              <label class="adm-field-label">Link do post no LinkedIn</label>
              <input type="url" class="adm-input" id="adm-f-url" placeholder="https://linkedin.com/posts/..." />
            </div>
  
            <div class="adm-form-actions">
              <button class="adm-btn-ghost" id="adm-f-cancel">Cancelar</button>
              <button class="adm-btn-primary" id="adm-f-save">Salvar publicação</button>
            </div>
  
            <p class="adm-success hidden" id="adm-success">✓ Salvo com sucesso!</p>
          </div>
        </div>
      </div>
    `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add("adm-open"));

  // Estado
  let editingId = null;

  // Refs
  const postList = overlay.querySelector("#adm-post-list");
  const fTitle = overlay.querySelector("#adm-f-title");
  const fDesc = overlay.querySelector("#adm-f-desc");
  const fTags = overlay.querySelector("#adm-f-tags");
  const fDate = overlay.querySelector("#adm-f-date");
  const fUrl = overlay.querySelector("#adm-f-url");
  const fSave = overlay.querySelector("#adm-f-save");
  const fCancel = overlay.querySelector("#adm-f-cancel");
  const newBtn = overlay.querySelector("#adm-new-btn");
  const closeBtn = overlay.querySelector("#adm-close-panel");
  const formTitle = overlay.querySelector("#adm-form-title");
  const descCount = overlay.querySelector("#adm-f-desc-count");
  const successMsg = overlay.querySelector("#adm-success");

  // Contador de chars
  fDesc.addEventListener("input", () => {
    descCount.textContent = fDesc.value.length;
  });

  function renderList() {
    const pubs = window.__PUB.getPubs();
    postList.innerHTML = "";

    if (!pubs.length) {
      postList.innerHTML = `<p class="adm-empty">Nenhuma publicação ainda.</p>`;
      return;
    }

    pubs.forEach((pub, i) => {
      const item = document.createElement("div");
      item.className = "adm-post-item";
      item.innerHTML = `
          <div class="adm-post-info">
            <span class="adm-post-num">0${i + 1}</span>
            <div>
              <p class="adm-post-title">${escHtml(pub.title)}</p>
              <p class="adm-post-date">${escHtml(pub.date)} · ${
        pub.tags?.slice(0, 2).map(escHtml).join(", ") ?? ""
      }</p>
            </div>
          </div>
          <div class="adm-post-actions">
            <button class="adm-icon-btn" data-action="up" data-id="${
              pub.id
            }" title="Mover para cima">↑</button>
            <button class="adm-icon-btn" data-action="down" data-id="${
              pub.id
            }" title="Mover para baixo">↓</button>
            <button class="adm-icon-btn adm-edit" data-action="edit" data-id="${
              pub.id
            }" title="Editar">✎</button>
            <button class="adm-icon-btn adm-del" data-action="delete" data-id="${
              pub.id
            }" title="Excluir">✕</button>
          </div>
        `;
      postList.appendChild(item);
    });
  }

  function clearForm() {
    fTitle.value = fDesc.value = fTags.value = fDate.value = fUrl.value = "";
    descCount.textContent = "0";
    editingId = null;
    formTitle.textContent = "Nova Publicação";
    successMsg.classList.add("hidden");
  }

  function fillForm(pub) {
    fTitle.value = pub.title;
    fDesc.value = pub.desc;
    fTags.value = (pub.tags ?? []).join(", ");
    fDate.value = pub.date ?? "";
    fUrl.value = pub.url ?? "";
    descCount.textContent = pub.desc.length;
    formTitle.textContent = "Editar Publicação";
    editingId = pub.id;
    fTitle.focus();
  }

  // Botão novo
  newBtn.addEventListener("click", () => clearForm());

  // Cancelar
  fCancel.addEventListener("click", () => clearForm());

  // Salvar
  fSave.addEventListener("click", () => {
    const title = fTitle.value.trim();
    const desc = fDesc.value.trim();
    if (!title || !desc) {
      fTitle.style.borderColor = !title ? "var(--adm-danger)" : "";
      fDesc.style.borderColor = !desc ? "var(--adm-danger)" : "";
      return;
    }
    fTitle.style.borderColor = fDesc.style.borderColor = "";

    const tags = fTags.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const pub = {
      id: editingId ?? `pub_${Date.now()}`,
      title,
      desc,
      tags,
      date: fDate.value.trim() || formatDateNow(),
      url: fUrl.value.trim(),
    };

    let pubs = window.__PUB.getPubs();

    if (editingId) {
      pubs = pubs.map((p) => (p.id === editingId ? pub : p));
    } else {
      pubs.unshift(pub); // mais recente primeiro
    }

    window.__PUB.savePubs(pubs);
    renderList();
    refreshPortfolio();
    clearForm();

    successMsg.classList.remove("hidden");
    setTimeout(() => successMsg.classList.add("hidden"), 3000);
  });

  // Ações na lista (delegação)
  postList.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;

    const { action, id } = btn.dataset;
    let pubs = window.__PUB.getPubs();
    const idx = pubs.findIndex((p) => p.id === id);
    if (idx === -1) return;

    if (action === "edit") {
      fillForm(pubs[idx]);
    } else if (action === "delete") {
      if (!confirm(`Excluir "${pubs[idx].title}"?`)) return;
      pubs.splice(idx, 1);
      window.__PUB.savePubs(pubs);
      renderList();
      refreshPortfolio();
      if (editingId === id) clearForm();
    } else if (action === "up" && idx > 0) {
      [pubs[idx - 1], pubs[idx]] = [pubs[idx], pubs[idx - 1]];
      window.__PUB.savePubs(pubs);
      renderList();
      refreshPortfolio();
    } else if (action === "down" && idx < pubs.length - 1) {
      [pubs[idx], pubs[idx + 1]] = [pubs[idx + 1], pubs[idx]];
      window.__PUB.savePubs(pubs);
      renderList();
      refreshPortfolio();
    }
  });

  // Fechar
  closeBtn.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });
  document.addEventListener("keydown", function onEsc(e) {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", onEsc);
    }
  });

  renderList();
}

// ── Atualiza a seção de publicações no portfólio sem recarregar ──
function refreshPortfolio() {
  if (typeof window.renderPublications === "function") {
    window.renderPublications();
  }
}

function formatDateNow() {
  return new Date().toLocaleDateString("pt-BR", {
    month: "short",
    year: "numeric",
  });
}

function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Init
document.addEventListener("DOMContentLoaded", initAdmin);
