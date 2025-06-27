/* /blocks/orbit-coaster/orbit-coaster.js
   Two-column version: 1 = image, 2 = alt-text
   Header row (merged) must contain "orbit-coaster". */

export default function decorate(block) {
  // Skip header (row 0)
  const rows = [...block.querySelectorAll('tr')].slice(1);
  const n    = rows.length;
  const dur  = 20;                       // seconds per full revolution

  // Replace table with orbit container
  block.innerHTML = '';
  block.classList.add('orbit-coaster');

  rows.forEach((row, i) => {
    const [imgCell, altCell] = row.cells;

    // Works for inline <img> or text path
    const imgTag = imgCell.querySelector('img');
    const src    = imgTag ? imgTag.src : imgCell.textContent.trim();
    const alt    = (altCell?.textContent || '').trim();

    // Even spacing + opposite directions
    const angle = (360 / n) * i;
    const delay = -(dur / 360) * angle;

    const item = document.createElement('div');
    item.className = `oc-item ${i % 2 ? 'even' : 'odd'}`; // even index → clockwise
    item.style.setProperty('--start', `${angle}deg`);
    item.style.animationDuration = `${dur}s`;
    item.style.animationDelay    = `${delay}s`;
    item.innerHTML = `<img src="${src}" alt="${alt}">`;

    block.append(item);
  });
}
