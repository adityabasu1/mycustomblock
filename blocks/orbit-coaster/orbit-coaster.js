/* Orbit-Coaster decorator – AEM-compatible version */
console.log('Orbit-Coaster decorator loaded 🚀');

export default function decorate(block) {
  const allRows = [...block.children]; // AEM turns table rows into direct div children

  if (!allRows.length) {
    console.warn('orbit-coaster: no rows found');
    return;
  }

  // Skip the header row and filter out empty rows
  const rows = allRows.filter(r => r.children.length).slice(1);
  console.log('orbit-coaster: rows.length =', rows.length);

  if (!rows.length) {
    console.warn('orbit-coaster: header found but no data rows');
    return;
  }

  const n = rows.length;
  const dur = 20; // seconds per revolution

  block.innerHTML = ''; // clear original content
  block.classList.add('orbit-coaster');

  rows.forEach((row, i) => {
    const [imgCell, altCell] = row.children;
    const imgTag = imgCell?.querySelector('img');
    const src = imgTag?.src || imgCell?.textContent?.trim();

    if (!src) {
      console.warn(`orbit-coaster: row ${i + 1} has no image`);
      return;
    }

    const alt = altCell?.textContent?.trim() || '';
    const angle = (360 / n) * i;
    const delay = -(dur / 360) * angle;

    const item = document.createElement('div');
    item.className = `oc-item ${i % 2 ? 'odd' : 'even'}`; // odd = counter-clockwise
    item.style.setProperty('--start', `${angle}deg`);
    item.style.animationDuration = `${dur}s`;
    item.style.animationDelay = `${delay}s`;
    item.innerHTML = `<img src="${src}" alt="${alt}">`;

    block.append(item);
  });
}
