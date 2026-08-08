// Lógica compartida del catálogo: dibuja las tarjetas de perfumes y maneja
// la búsqueda + los chips de filtro. La usan home.html, catalogo.html,
// hombre.html, mujer.html y unisex.html.

function normalizeText(str){
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function bottleSVG(colorA, colorB){
  return `<svg width="70" height="120" viewBox="0 0 180 320">
    <rect x="40" y="56" width="100" height="230" rx="30" fill="${colorA}"/>
    <rect x="72" y="18" width="36" height="28" rx="6" fill="${colorB}"/>
  </svg>`;
}

function pieceHTML(p){
  return `
    <div class="piece" data-id="${p.id}" data-gender="${p.gender}" data-family="${p.family}">
      <div class="avail${p.available ? '' : ' out'}">${p.available ? 'En stock' : 'Agotado'}</div>
      <div class="roundframe">${bottleSVG(p.colorA, p.colorB)}</div>
      <div class="gender">${p.gender}</div>
      <h3>${p.name}</h3>
      <div class="notes">${p.tags.map(t => `<span class="n-tag">${t}</span>`).join('')}</div>
      <div class="foot"><a href="producto.html?id=${p.id}" class="btn-line">Ver detalle</a></div>
    </div>`;
}

/**
 * Pinta un conjunto de productos dentro de un contenedor.
 * baseList: arreglo de productos ya filtrado por la página (ej. solo "Hombre").
 */
function renderMosaic(containerEl, baseList){
  containerEl.innerHTML = baseList.map(pieceHTML).join('');
}

/**
 * Configura una página de catálogo: búsqueda + chips de filtro sobre baseList.
 * options: { containerEl, noResultsEl, searchInputEl, chipsEls, extraFilter }
 * extraFilter(product, chipValue) -> boolean, para chips además de género (ej. familias)
 */
function setupCatalogPage({ containerEl, noResultsEl, searchInputEl, chipsEls, baseList, filterFn }){
  let currentFilter = 'Todos';

  function apply(){
    const q = normalizeText((searchInputEl?.value || '').trim());
    const filtered = baseList.filter(p => {
      const inFilter = filterFn ? filterFn(p, currentFilter) : true;
      const haystack = normalizeText([p.name, p.gender, p.family, ...p.tags].join(' '));
      const inSearch = q === '' || haystack.includes(q);
      return inFilter && inSearch;
    });
    renderMosaic(containerEl, filtered);
    if(noResultsEl) noResultsEl.style.display = filtered.length === 0 ? 'block' : 'none';
  }

  if(searchInputEl){
    searchInputEl.addEventListener('input', apply);
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    if(initialQuery) searchInputEl.value = initialQuery;
  }

  if(chipsEls){
    chipsEls.forEach(chip => {
      chip.addEventListener('click', () => {
        currentFilter = chip.dataset.filter;
        chipsEls.forEach(c => c.classList.toggle('active', c === chip));
        apply();
      });
    });
  }

  apply();
}