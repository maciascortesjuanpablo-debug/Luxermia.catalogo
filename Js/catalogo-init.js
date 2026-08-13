function matchesChip(p, filter){
  if(filter === 'Todos') return true;
  if(filter === 'Hombre' || filter === 'Mujer' || filter === 'Unisex') return p.gender === filter;
  if(filter === 'Amaderados') return normalizeText(p.family).includes('amaderado');
  if(filter === 'Florales') return normalizeText(p.family).includes('floral');
  return true;
}

fetchProductos().then(productos => {
  setupCatalogPage({
    containerEl: document.getElementById('catalogoMosaic'),
    noResultsEl: document.getElementById('noResults'),
    searchInputEl: document.getElementById('searchInput'),
    chipsEls: Array.from(document.querySelectorAll('.chip')),
    baseList: productos,
    filterFn: matchesChip
  });
});