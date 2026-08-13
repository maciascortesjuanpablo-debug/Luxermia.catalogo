function splitNameLines(name){
  const words = name.split(' ');
  if(words.length <= 1) return [name.toUpperCase(), ''];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(' ').toUpperCase(), words.slice(mid).join(' ').toUpperCase()];
}

function renderNoteTags(containerEl, notes){
  containerEl.innerHTML = notes.map(n => `<span class="note-tag">${n}</span>`).join('');
}

function renderProducto(p){
  document.title = `${p.name} — LuxeViaAromas`;
  document.getElementById('crumbGender').textContent = p.gender;
  document.getElementById('crumbName').textContent = p.name;

  document.getElementById('genderBadge').textContent = p.gender;
  document.getElementById('familyText').textContent = p.family;
  document.getElementById('productName').textContent = p.name;
  document.getElementById('maisonText').textContent = `Eau de Parfum · ${p.ml} ml`;

  const stockBadge = document.getElementById('stockBadge');
  stockBadge.textContent = p.available ? 'En stock' : 'Agotado';
  const stockText = document.getElementById('stockText');
  stockText.textContent = p.available ? '● En stock' : '● Agotado';
  stockText.style.color = p.available ? '#9fc79f' : '#c98a8a';

  document.getElementById('descText').textContent = p.description;

  renderNoteTags(document.getElementById('notesSalida'), p.notes.salida);
  renderNoteTags(document.getElementById('notesCorazon'), p.notes.corazon);
  renderNoteTags(document.getElementById('notesFondo'), p.notes.fondo);

  const [line1, line2] = splitNameLines(p.name);
  document.getElementById('svgLine1').textContent = line1;
  document.getElementById('svgLine2').textContent = line2;

  const addBtn = document.getElementById('addToCartBtn');
  if(!p.available){
    addBtn.disabled = true;
    addBtn.style.opacity = '0.5';
    addBtn.style.cursor = 'not-allowed';
    addBtn.innerHTML = 'No disponible';
  }

  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('productWrap').style.display = 'grid';
}

function initInteractions(){
  document.querySelectorAll('.acc-head').forEach(h=>{
    h.addEventListener('click', ()=>{
      const item = h.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i=>{ i.classList.remove('open'); i.querySelector('.plus').textContent='+'; });
      if(!wasOpen){ item.classList.add('open'); h.querySelector('.plus').textContent='–'; }
    });
  });
  document.querySelectorAll('.qty button').forEach((btn,i)=>{
    btn.addEventListener('click', ()=>{
      const span = btn.parentElement.querySelector('span');
      let val = parseInt(span.textContent);
      if(i===0) val = Math.max(1, val-1); else val += 1;
      span.textContent = val;
    });
  });
  document.getElementById('addToCartBtn').addEventListener('click', ()=>{
    const qtySpan = document.querySelector('.qty span');
    const qty = parseInt(qtySpan.textContent) || 1;
    addToCart(productId, qty);
    window.location.href = 'carrito.html';
  });
  document.getElementById('searchInput').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && e.target.value.trim() !== ''){
      window.location.href = 'catalogo.html?q=' + encodeURIComponent(e.target.value.trim());
    }
  });
}

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

initInteractions();

if(!productId){
  document.getElementById('loadingState').style.display = 'none';
  document.getElementById('notFoundState').style.display = 'block';
} else {
  fetchProductoPorId(productId).then(producto => {
    if(producto){
      renderProducto(producto);
    } else {
      document.getElementById('loadingState').style.display = 'none';
      document.getElementById('notFoundState').style.display = 'block';
    }
  });
}