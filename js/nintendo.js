let cart = [];

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

async function loadProducts() {
    try {
        const response = await fetch('data/nintendo.json');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('productsContainer');
    container.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-name">${product.name}</div>
            <div class="product-price">S/ ${product.price.toFixed(2)}</div>
            <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(product)})'>
                <i class="fas fa-cart-plus"></i> Agregar al carrito
            </button>
        </div>
    `).join('');
}

function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    updateCart();
    showNotification('Producto agregado al carrito');
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const emptyCart = document.getElementById('emptyCart');
    const totalAmount = document.getElementById('totalAmount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        cartTotal.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        emptyCart.style.display = 'none';
        cartTotal.style.display = 'block';
        
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">S/ ${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalAmount.textContent = `S/ ${total.toFixed(2)}`;
    }
}

function updateQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    modal.classList.toggle('active');
}

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return;

    const orderNumber = 'ORD-' + Date.now();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cartContent').innerHTML = `
        <div class="order-confirmation">
            <i class="fas fa-check-circle"></i>
            <h2>¡Orden Confirmada!</h2>
            <p>Gracias por tu compra</p>
            <div class="order-number">
                Número de orden: ${orderNumber}
            </div>
            <p>Total: S/ ${total.toFixed(2)}</p>
            <p style="color: #6b7280; margin-top: 1rem;">
                Recibirás un correo de confirmación en breve
            </p>
            <button class="checkout-btn" onclick="closeOrder()">Continuar Comprando</button>
        </div>
    `;

    cart = [];
    saveCart();
    updateCart();
}

function closeOrder() {
    toggleCart();
    setTimeout(() => {
        document.getElementById('cartContent').innerHTML = `
            <div class="cart-header">
                <h2><i class="fas fa-shopping-cart"></i> Mi Carrito</h2>
                <button class="close-cart" onclick="toggleCart()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="cartItems"></div>
            <div class="cart-total" id="cartTotal" style="display:none;">
                <h3>Total: <span id="totalAmount">S/ 0.00</span></h3>
                <button class="checkout-btn" onclick="checkout()">
                    <i class="fas fa-credit-card"></i> Proceder al Pago
                </button>
            </div>
            <div class="empty-cart" id="emptyCart">
                <i class="fas fa-shopping-basket" style="font-size: 3rem; color: #d1d5db; margin-bottom: 1rem;"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        updateCart();
    }, 300);
}

function showNotification(message) {
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
    notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

document.getElementById('cartModal').addEventListener('click', (e) => {
    if (e.target.id === 'cartModal') {
        toggleCart();
    }
});

loadCart();
loadProducts();