/* blocks/linkedin-cards/linkedin-cards.js
   Converts the authoring table into LinkedIn profile cards   */

   export default function decorate(block) {
    // Rows in the author table; first row is the header (block name)
    const rows = [...block.querySelectorAll(':scope > div')];
    const dataRows = rows.slice(1); // skip header
  
    dataRows.forEach((row, idx) => {
      const [imgCell, nameCell, urlCell] = row.children;
      const img  = imgCell.querySelector('img');
      const name = nameCell.textContent.trim();
      const url  = urlCell.textContent.trim();
  
      /* ----- build card ----- */
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
      /* ---------- odd / even colouring ---------- *
         idx is 0-based:
           0, 2, 4… (odd-numbered card to the reader) => blue
           1, 3, 5… (even-numbered card)              => orange           */
      btn.className = `btn ${idx % 2 === 0 ? 'blue' : 'orange'}`;
      btn.textContent = `LinkedIn Profile of ${name}`;
      card.append(btn);
  
      /* Replace the original table row with the finished card */
      row.replaceWith(card);
    });
  }
  