/* Orbit-Coaster decorator v2
   –  header row (merged) must contain "orbit-coaster"
   –  each data row must have at least ONE cell (image). Second cell = alt-text (optional)
*/

console.log('Orbit-Coaster decorator loaded 🚀');

export default function decorate(block) {
  /* 1. Collect rows */
  const allRows = [...block.querySelectorAll('tr')];
  if (!allRows.length) {
    console.warn('orbit-coaster: no <tr> found inside block');
    return;
  }

  /* Remove the header row (row 0) and filter out accidental blank rows */
  const rows = allRows.slice(1).filter((r) => r.cells.length);
  console.log('orbit-coaster: rows.length =', rows.length);

  if (!rows.length) {
    console.warn('orbit-coaster: header found but no data rows — check your table.');
    return;
  }

  /* 2. Prepare container */
  const n   = rows.length;
  const dur = 20;                          // seconds per revolution
  block.innerHTML = '';                    // wipe the raw table
  block.classList.add('orbit-coaster');    // required by CSS

  /* 3. Build orbit items */
  rows.forEach((row, i) => {
    const [imgCell, altCell] = row.cells;  // altCell may be undefined

    /* Accept inline <img> or a plain text path */
    const imgTag = imgCell?.querySelector('img');
    const src    = imgTag ? imgTag.src : imgCell.textContent.trim();

    if (!src) {
      console.warn(`orbit-coaster: row ${i + 1} has no image source — skipping`);
      return;
    }

    const alt = (altCell?.textContent || '').trim();

    /* Equal spacing + opposite spin directions */
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
