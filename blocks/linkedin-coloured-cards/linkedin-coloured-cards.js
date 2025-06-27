/* blocks/linkedin-coloured-cards/linkedin-coloured-cards.js */

/* Inject CSS manually if lib-franklin is not present */
function ensureCSS() {
  const href = `${window.hlx.codeBasePath}/blocks/linkedin-coloured-cards/linkedin-coloured-cards.css`;
  if (!document.head.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.append(link);
  }
}
ensureCSS();

export default function decorate(block) {
  const rows = [...block.querySelectorAll(':scope > div')].slice(1); // Skip header row

  rows.forEach((row, idx) => {
    const [imgCell, nameCell, urlCell] = row.children;

    const img  = imgCell.querySelector('img');
    const name = nameCell.textContent.trim();
    const url  = (urlCell.querySelector('a') || urlCell).textContent.trim();

    const card = document.createElement('div');
    card.className = 'card';
    if (img) card.append(img);

    const title = document.createElement('h3');
    title.textContent = name;
    card.append(title);

    const btn = document.createElement('a');
    btn.href = url;
    btn.target = '_blank';
    btn.rel = 'noopener';
    btn.className = `btn ${idx % 2 === 0 ? 'blue' : 'orange'}`;
    btn.textContent = `LinkedIn Profile of ${name}`;
    card.append(btn);

    row.replaceWith(card);
  });
}
