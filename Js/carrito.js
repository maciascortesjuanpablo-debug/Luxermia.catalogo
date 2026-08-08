// Número del vendedor — reemplázalo por el número real con indicativo de país, sin + ni espacios
  const WHATSAPP_NUMBER = "573000000000";

  const bottleColors = { a:"#c6a15b", b:"#e8d6a0", c:"#8a7143" };
  function bottleSVG(fillA, fillB){
    return `<svg viewBox="0 0 180 320"><rect x="40" y="56" width="100" height="230" rx="30" fill="${fillA}"/><rect x="72" y="18" width="36" height="28" rx="6" fill="${fillB}"/></svg>`;
  }

  let cart = [
    { id:1, name:"Ambre Nocturne", gender:"Hombre", notes:["Cedro","Vainilla","Tabaco"], qty:1, colorA:bottleColors.a, colorB:bottleColors.b },
    { id:2, name:"Fleur de Soie", gender:"Mujer", notes:["Jazmín","Pera","Almizcle"], qty:2, colorA:bottleColors.b, colorB:bottleColors.a },
    { id:3, name:"Santal Infini", gender:"Unisex", notes:["Sándalo","Bergamota","Ámbar"], qty:1, colorA:bottleColors.c, colorB:bottleColors.b },
  ];

  const cartWrap = document.getElementById('cartWrap');
  const emptyState = document.getElementById('emptyState');
  const noteField = document.getElementById('noteField');
  const checkoutBar = document.getElementById('checkoutBar');
  const itemCount = document.getElementById('itemCount');

  function render(){
    cartWrap.innerHTML = '';
    if(cart.length === 0){
      emptyState.style.display = 'block';
      noteField.style.display = 'none';
      checkoutBar.style.display = 'none';
      itemCount.textContent = '0';
      return;
    }
    emptyState.style.display = 'none';
    noteField.style.display = 'block';
    checkoutBar.style.display = 'flex';

    let totalQty = 0;
    cart.forEach(item => {
      totalQty += item.qty;
      const el = document.createElement('div');
      el.className = 'item';
      el.dataset.id = item.id;
      el.innerHTML = `
        <div class="frame">${bottleSVG(item.colorA, item.colorB)}</div>
        <div class="info">
          <div class="gender">${item.gender}</div>
          <h3>${item.name}</h3>
          <div class="notes">${item.notes.map(n => `<span class="n-tag">${n}</span>`).join('')}</div>
        </div>
        <div class="controls">
          <div class="qty">
            <button data-action="minus">−</button>
            <span>${item.qty}</span>
            <button data-action="plus">+</button>
          </div>
          <button class="remove-btn" data-action="remove" title="Quitar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        </div>
      `;
      cartWrap.appendChild(el);
    });
    itemCount.textContent = totalQty;
  }

  cartWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if(!btn) return;
    const row = e.target.closest('.item');
    const id = parseInt(row.dataset.id);
    const item = cart.find(i => i.id === id);
    const action = btn.dataset.action;

    if(action === 'plus'){ item.qty += 1; render(); }
    if(action === 'minus'){ item.qty = Math.max(1, item.qty - 1); render(); }
    if(action === 'remove'){
      row.classList.add('removing');
      setTimeout(() => {
        cart = cart.filter(i => i.id !== id);
        render();
      }, 250);
    }
  });

  document.getElementById('checkoutBtn').addEventListener('click', () => {
    if(cart.length === 0) return;
    let msg = `¡Hola LuxeViaAromas! Quiero hacer este pedido:%0A%0A`;
    cart.forEach(item => {
      msg += `• ${item.qty}x ${item.name} (${item.gender})%0A`;
    });
    const note = document.getElementById('noteText').value.trim();
    if(note){ msg += `%0ANota: ${note}%0A`; }
    msg += `%0AQuedo atento(a) al precio y disponibilidad. ¡Gracias!`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
    window.open(url, '_blank');
  });

  render();
  document.getElementById('searchInput').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && e.target.value.trim() !== ''){
      window.location.href = 'catalogo.html?q=' + encodeURIComponent(e.target.value.trim());
    }
  });