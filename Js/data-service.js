// Servicio de datos: lee los perfumes desde Firestore (colección "productos").
// Reemplaza al antiguo arreglo estático PRODUCTOS — ahora el catálogo se
// actualiza solo, sin tocar código, editando directamente en Firebase.

/**
 * Trae todos los perfumes de Firestore.
 * @returns {Promise<Array>} arreglo de productos
 */
function fetchProductos(){
  return db.collection('productos').get().then(snapshot => {
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }).catch(err => {
    console.error('Error cargando el catálogo desde Firebase:', err);
    return [];
  });
}

/**
 * Trae un solo perfume por su id (el mismo id que usa la URL producto.html?id=...).
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
function fetchProductoPorId(id){
  return db.collection('productos').doc(String(id)).get().then(doc => {
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  }).catch(err => {
    console.error('Error cargando el producto desde Firebase:', err);
    return null;
  });
}