export default function decorate(block) {
    // turn each row into a .card with .front/.back sides
    [...block.children].forEach((row) => {
      const cells = [...row.children];
      const card  = document.createElement('div');
      card.className = 'card';
      card.tabIndex = 0;                 // focusable for keyboard users
  
      // build front
      const front = document.createElement('div');
      front.className = 'side front';
      front.append(cells[0].querySelector('img') || cells[0].textContent);
      card.append(front);
  
      // build back (if caption data exists)
      const back = document.createElement('div');
      back.className = 'side back';
      if (cells[1]) back.append(Object.assign(document.createElement('h3'), {textContent: cells[1].textContent}));
      if (cells[2]) back.append(Object.assign(document.createElement('p'), {textContent: cells[2].textContent}));
      if (cells[3]) back.append(Object.assign(document.createElement('p'), {textContent: cells[3].textContent}));
      card.append(back);
  
      // replace original row with card
      row.replaceWith(card);
  
      // tap support
      card.addEventListener('click', () => card.classList.toggle('flipped'));
    });
  }
  