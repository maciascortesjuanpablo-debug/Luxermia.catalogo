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
    window.location.href = 'carrito.html';
  });
  document.getElementById('searchInput').addEventListener('keydown', (e)=>{
    if(e.key === 'Enter' && e.target.value.trim() !== ''){
      window.location.href = 'catalogo.html?q=' + encodeURIComponent(e.target.value.trim());
    }
  });