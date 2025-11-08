// Funciones del carrito de compras

// Obtener el carrito del localStorage
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        return [];
    }
}

// Guardar el carrito en localStorage
function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
}

// Actualizar el contador del carrito
function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cartCount');
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
    }
}

// Agregar producto al carrito
function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    // Mostrar notificación
    showNotification('Producto agregado al carrito');
}

// Mostrar notificación
function showNotification(message) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Actualizar cantidad de producto
function updateQuantity(productId, change) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart(cart);
            updateCartDisplay();
        }
    }
}

// Eliminar producto del carrito
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartDisplay();
}

// Actualizar visualización del carrito
function updateCartDisplay() {
    const cart = getCart();
    const cartItemsEl = document.getElementById('cartItems');
    const cartTotalEl = document.getElementById('cartTotal');
    const emptyCartEl = document.getElementById('emptyCart');
    const totalAmountEl = document.getElementById('totalAmount');
    
    if (!cartItemsEl) return;
    
    if (cart.length === 0) {
        cartItemsEl.innerHTML = '';
        if (cartTotalEl) cartTotalEl.style.display = 'none';
        if (emptyCartEl) emptyCartEl.style.display = 'block';
        return;
    }
    
    if (emptyCartEl) emptyCartEl.style.display = 'none';
    if (cartTotalEl) cartTotalEl.style.display = 'block';
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">S/ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    });
    
    cartItemsEl.innerHTML = html;
    if (totalAmountEl) {
        totalAmountEl.textContent = `S/ ${total.toFixed(2)}`;
    }
}

// Toggle del carrito
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.toggle('active');
        if (cartModal.classList.contains('active')) {
            updateCartDisplay();
        }
    }
}

// Proceder al checkout
function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Limpiar carrito
    localStorage.removeItem('cart');
    updateCartCount();
    
    // Mostrar confirmación
    const cartModal = document.getElementById('cartModal');
    const cartContent = document.getElementById('cartContent');
    
    if (cartContent) {
        cartContent.innerHTML = `
            <div class="order-confirmation">
                <i class="fas fa-check-circle"></i>
                <h2>¡Pedido Realizado!</h2>
                <p>Gracias por tu compra</p>
                <div class="order-number">
                    Número de orden: #${Math.floor(Math.random() * 10000)}
                </div>
                <button class="checkout-btn" onclick="toggleCart(); location.reload();">
                    Continuar Comprando
                </button>
            </div>
        `;
    }
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    if (cartModal && event.target === cartModal) {
        toggleCart();
    }
});

// Inicializar contador al cargar
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Abrir carrito si se guardó el flag
    if (localStorage.getItem('openCart') === 'true') {
        localStorage.removeItem('openCart');
        setTimeout(() => toggleCart(), 100);
    }
});