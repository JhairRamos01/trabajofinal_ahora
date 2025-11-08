// Cargar productos desde el JSON
fetch('data/novedades.json')
    .then(response => response.json())
    .then(products => {
        displayProducts(products);
    })
    .catch(error => console.error('Error al cargar productos:', error));

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    if (!container) return;
    
    let html = '';
    
    products.forEach(product => {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">S/ ${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product)})'>
                    <i class="fas fa-shopping-cart"></i> Agregar al Carrito
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}