# 🚀 Portfólio — Miguel Oliveira Kanuto Menezes

Site portfólio pessoal moderno, estilo dev, azul/ciano.

## 📁 Estrutura do Projeto

```
portfolio/
├── index.html              ← Página principal
├── css/
│   └── style.css           ← Todos os estilos
├── js/
│   └── main.js             ← Animações, typewriter, sliders
└── assets/
    └── images/
        ├── civifix-logo.png
        ├── civifix-ss1~4.png
        └── photo.jpg        ← ADICIONE SUA FOTO AQUI
```

## ▶️ Como Rodar Localmente

### Opção 1 — Direto no navegador
Abra o arquivo `index.html` diretamente no Chrome/Firefox.

### Opção 2 — Com servidor local (recomendado)
```bash
# Instale o Node.js em nodejs.org, depois:
npx serve .

# Ou com Python:
python -m http.server 3000
```
Acesse: http://localhost:3000

## ✏️ Como Editar

### Adicionar sua foto
1. Coloque sua foto em `assets/images/photo.jpg`
2. No `index.html`, substitua a `div.about-photo-placeholder` por:
```html
<img src="assets/images/photo.jpg" alt="Miguel Oliveira" 
     style="border-radius: var(--radius-lg); width:100%; max-height:400px; object-fit:cover;" />
```

### Adicionar novo projeto
Copie o bloco comentado em `index.html` na seção `#projects`.

### Adicionar nova certificação
Copie o template comentado em `index.html` na seção `#certifications`.

### Ativar carrossel de certificações (quando tiver 4+)
No `style.css`, adicione à classe `.certs-wrapper`:
```css
overflow: hidden;
flex-wrap: nowrap;
```
E configure scroll automático no `main.js`.

### Configurar Sketchfab
1. Vá ao sketchfab.com/Miguel-OK
2. Abra um modelo → clique em Embed → copie o `src` do iframe
3. Substitua o `src` dos iframes na seção `#models` em `index.html`

### Adicionar nova publicação
Copie o template comentado na seção `#publications`.

## 🎨 Customização Visual

Todas as cores estão em variáveis CSS no início do `style.css`:
```css
:root {
  --cyan: #00d4ff;    /* Cor principal */
  --blue: #0066ff;    /* Cor secundária */
  --bg-primary: #050d1a; /* Fundo */
}
```

## 🌐 Deploy Gratuito

- **Vercel**: arraste a pasta em vercel.com
- **Netlify**: arraste a pasta em netlify.com  
- **GitHub Pages**: suba no GitHub e ative Pages nas configurações
