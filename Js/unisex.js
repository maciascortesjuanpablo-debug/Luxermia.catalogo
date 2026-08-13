function matchesChip(p, filter){
  if(filter === 'Todos') return true;
  if(filter === 'Amaderados') return normalizeText(p.family).includes('amaderado');
  if(filter === 'Florales') return normalizeText(p.family).includes('floral');
  return true;
}

fetchProductos().then(productos => {
  const baseList = productos.filter(p => p.gender === 'Unisex');
  setupCatalogPage({
    containerEl: document.getElementById('catMosaic'),
    noResultsEl: document.getElementById('noResults'),
    searchInputEl: document.getElementById('searchInput'),
    chipsEls: Array.from(document.querySelectorAll('.chip')),
    baseList: baseList,
    filterFn: matchesChip
  });
});