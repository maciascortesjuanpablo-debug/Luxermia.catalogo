// Manejo del carrito de compras.
// Se guarda en localStorage (el navegador del cliente) para que el carrito
// se mantenga aunque navegue entre home.html, producto.html, carrito.html, etc.
// No requiere backend ni login — cada visitante tiene su propio carrito local.

const CART_KEY = 'luxevia_cart';

function getCart(){
  try{
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

/** Agrega un producto al carrito (o suma cantidad si ya estaba). */
function addToCart(productId, qty){
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find(item => item.id === String(productId));
  if(existing){
    existing.qty += qty;
  } else {
    cart.push({ id: String(productId), qty: qty });
  }
  saveCart(cart);
}

function updateCartQty(productId, qty){
  const cart = getCart();
  const item = cart.find(i => i.id === String(productId));
  if(item){
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function removeFromCart(productId){
  const cart = getCart().filter(i => i.id !== String(productId));
  saveCart(cart);
}

function getCartCount(){
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/** Actualiza el numerito del carrito en el nav (si la página tiene uno). */
function updateCartBadge(){
  const badge = document.querySelector('.cart-pill .dot');
  if(badge) badge.textContent = getCartCount();
}

document.addEventListener('DOMContentLoaded', updateCartBadge);