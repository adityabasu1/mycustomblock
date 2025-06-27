/* Orbit-Coaster – turn a table of images into orbiting cards */
export default function decorate(block) {
    const rows = [...block.querySelectorAll('tr')].slice(1); // skip header
    const n    = rows.length;
    const dur  = 20; // seconds for a full revolution
  
    /* Build items */
    block.innerHTML = '';   // wipe the table
    rows.forEach((row, i) => {
      const [, imgCell, altCell] = row.cells;
      const angle   = (360 / n) * i;      // starting angle in degrees
      const delay   = -(dur / 360) * angle;
  
      const item = document.createElement('div');
      item.className = `oc-item ${i % 2 ? 'even' : 'odd'}`; // 0-index → odd/even
      item.style.setProperty('--start', `${angle}deg`);
      item.style.animationDuration = `${dur}s`;
      item.style.animationDelay    = `${delay}s`;
  
      item.innerHTML = `<img src="${imgCell.textContent.trim()}"
                             alt="${altCell.textContent.trim() || ''}">`;
      block.append(item);
    });
  }
  