const destacados = PRODUCTOS.filter(p => p.featured);
  setupCatalogPage({
    containerEl: document.getElementById('destacadosMosaic'),
    noResultsEl: document.getElementById('noResults'),
    searchInputEl: document.getElementById('searchInput'),
    chipsEls: null,
    baseList: destacados,
    filterFn: null
  });