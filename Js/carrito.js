// Número del vendedor — reemplázalo por el número real con indicativo de país, sin + ni espacios
const WHATSAPP_NUMBER = "573000000000";

const cartWrap = document.getElementById('cartWrap');
const emptyState = document.getElementById('emptyState');
const noteField = document.getElementById('noteField');
const checkoutBar = document.getElementById('checkoutBar');
const itemCount = document.getElementById('itemCount');

let cartItems = []; // [{ ...datosDelProducto, qty }]

function itemRowHTML(item){
  return `
    <div class="item" data-id="${item.id}">
      <div class="frame">${bottleSVG(item.colorA, item.colorB)}</div>
      <div class="info">
        <div class="gender">${item.gender}</div>
        <h3>${item.name}</h3>
        <div class="notes">${item.tags.map(t => `<span class="n-tag">${t}</span>`).join('')}</div>
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
    </div>`;
}

function render(){
  const localCart = getCart();

  if(localCart.length === 0){
    cartWrap.innerHTML = '';
    emptyState.style.display = 'block';
    noteField.style.display = 'none';
    checkoutBar.style.display = 'none';
    itemCount.textContent = '0';
    return;
  }

  fetchProductos().then(productos => {
    cartItems = localCart
      .map(entry => {
        const producto = productos.find(p => p.id === entry.id);
        return producto ? { ...producto, qty: entry.qty } : null;
      })
      .filter(Boolean); // por si algún id ya no existe en el catálogo

    if(cartItems.length === 0){
      emptyState.style.display = 'block';
      noteField.style.display = 'none';
      checkoutBar.style.display = 'none';
      cartWrap.innerHTML = '';
      itemCount.textContent = '0';
      return;
    }

    emptyState.style.display = 'none';
    noteField.style.display = 'block';
    checkoutBar.style.display = 'flex';

    cartWrap.innerHTML = cartItems.map(itemRowHTML).join('');
    itemCount.textContent = cartItems.reduce((sum, i) => sum + i.qty, 0);
  });
}

cartWrap.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if(!btn) return;
  const row = e.target.closest('.item');
  const id = row.dataset.id;
  const action = btn.dataset.action;
  const item = cartItems.find(i => i.id === id);

  if(action === 'plus'){
    updateCartQty(id, item.qty + 1);
    render();
  }
  if(action === 'minus'){
    updateCartQty(id, Math.max(1, item.qty - 1));
    render();
  }
  if(action === 'remove'){
    row.classList.add('removing');
    setTimeout(() => {
      removeFromCart(id);
      render();
    }, 200);
  }
});

document.getElementById('checkoutBtn').addEventListener('click', () => {
  if(cartItems.length === 0) return;
  let msg = `¡Hola LuxeViaAromas! Quiero hacer este pedido:%0A%0A`;
  cartItems.forEach(item => {
    msg += `• ${item.qty}x ${item.name} (${item.gender})%0A`;
  });
  const note = document.getElementById('noteText').value.trim();
  if(note){ msg += `%0ANota: ${note}%0A`; }
  msg += `%0AQuedo atento(a) al precio y disponibilidad. ¡Gracias!`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  window.open(url, '_blank');
});

document.getElementById('searchInput').addEventListener('keydown', (e) => {
  if(e.key === 'Enter' && e.target.value.trim() !== ''){
    window.location.href = 'catalogo.html?q=' + encodeURIComponent(e.target.value.trim());
  }
});

render();