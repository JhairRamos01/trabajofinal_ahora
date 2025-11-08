// Crear el header dinámicamente con CSS integrado
document.addEventListener('DOMContentLoaded', function() {
    // Insertar CSS en el head
    const styleHeader = document.createElement('style');
    styleHeader.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f5f5;
        }

        /* Header Styles */
        header {
            background: linear-gradient(135deg, #2855d6 0%, #1e40af 100%);
            color: white;
            padding: 1rem 2rem;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 1.5rem;
            font-weight: bold;
        }

        .logo i {
            font-size: 2rem;
        }

        nav {
            display: flex;
            gap: 2rem;
            align-items: center;
        }

        nav a {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            transition: all 0.3s ease;
            font-weight: 500;
        }

        nav a:hover {
            background: rgba(255,255,255,0.2);
            transform: translateY(-2px);
        }

        .cart-btn {
            background: white !important;
            color: #2855d6 !important;
            padding: 0.6rem 1.2rem !important;
            border-radius: 25px !important;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }

        .cart-btn:hover {
            transform: translateY(-3px) !important;
            box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .cart-count {
            background: #ef4444;
            color: white;
            border-radius: 50%;
            padding: 0.2rem 0.5rem;
            font-size: 0.85rem;
            min-width: 20px;
            text-align: center;
        }

        .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            cursor: pointer;
            padding: 5px;
        }

        .hamburger span {
            width: 25px;
            height: 3px;
            background: white;
            border-radius: 3px;
            transition: all 0.3s ease;
        }

        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(8px, 8px);
        }

        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }

        /* Main Content */
        main {
            max-width: 1400px;
            margin: 2rem auto;
            padding: 0 2rem;
            min-height: 60vh;
        }

        .page-title {
            text-align: center;
            color: #2855d6;
            margin-bottom: 2rem;
            font-size: 2rem;
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }

        .product-card {
            background: white;
            border-radius: 15px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .product-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }

        .product-image {
            width: 100%;
            height: 350px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 1rem;
        }

        .product-name {
            font-size: 1.1rem;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 0.5rem;
            text-align: center;
        }

        .product-price {
            font-size: 1.5rem;
            font-weight: bold;
            color: #1e40af;
            margin: 1rem 0;
        }

        .add-to-cart-btn {
            background: linear-gradient(135deg, #2855d6 0%, #1e40af 100%);
            color: white;
            border: none;
            padding: 0.8rem 2rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            box-shadow: 0 4px 6px rgba(40, 85, 214, 0.3);
        }

        .add-to-cart-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(40, 85, 214, 0.4);
        }

        /* Cart Modal */
        .cart-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        }

        .cart-modal.active {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .cart-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            animation: slideUp 0.3s ease;
        }

        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1.5rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e5e7eb;
        }

        .cart-header h2 {
            color: #2855d6;
        }

        .close-cart {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #6b7280;
            transition: color 0.3s ease;
        }

        .close-cart:hover {
            color: #ef4444;
        }

        .cart-item {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border-bottom: 1px solid #e5e7eb;
            align-items: center;
        }

        .cart-item-image {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 8px;
        }

        .cart-item-details {
            flex: 1;
        }

        .cart-item-name {
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .cart-item-price {
            color: #2855d6;
            font-weight: bold;
        }

        .cart-item-quantity {
            display: flex;
            gap: 0.5rem;
            align-items: center;
            margin-top: 0.5rem;
        }

        .qty-btn {
            background: #2855d6;
            color: white;
            border: none;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .qty-btn:hover {
            background: #1e40af;
            transform: scale(1.1);
        }

        .remove-btn {
            background: #ef4444;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .remove-btn:hover {
            background: #dc2626;
        }

        .cart-total {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 2px solid #2855d6;
            text-align: right;
        }

        .cart-total h3 {
            font-size: 1.5rem;
            color: #2855d6;
        }

        .checkout-btn {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            width: 100%;
            margin-top: 1rem;
            transition: all 0.3s ease;
            box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
        }

        .checkout-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(16, 185, 129, 0.4);
        }

        .empty-cart {
            text-align: center;
            padding: 2rem;
            color: #6b7280;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        @media (max-width: 768px) {
            .hamburger {
                display: flex;
            }

            nav {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: #1e40af;
                flex-direction: column;
                padding: 1rem;
                gap: 0;
            }

            nav.active {
                display: flex;
            }

            nav a {
                width: 100%;
                padding: 1rem;
                border-bottom: 1px solid rgba(255,255,255,0.1);
            }

            .products-grid {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
            }

            main {
                padding: 0 1rem;
            }

            .page-title {
                font-size: 1.5rem;
            }
        }
    `;
    document.head.appendChild(styleHeader);
    
    const headerHTML = `
        <header>
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-gamepad"></i>
                    <span>VideoGamesMVP</span>
                </div>
                <div class="hamburger" onclick="toggleMenu()">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav id="mainNav">
                    <a href="index.html">Novedades</a>
                    <a href="PS5.html">PS5</a>
                    <a href="PS4.html">PS4</a>
                    <a href="Nintendo.html">Nintendo Switch</a>
                    <a href="Juegos.html">Juegos</a>
                    <a href="contacto.html">Contacto</a>
                    <a href="#" class="cart-btn" onclick="toggleCart(); return false;">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cartCount">0</span>
                    </a>
                </nav>
            </div>
        </header>
    `;
    
    document.getElementById('header').innerHTML = headerHTML;
    
    // Cargar el carrito si existe
    loadCartCount();
});

function loadCartCount() {
    try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const cart = JSON.parse(savedCart);
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const cartCountEl = document.getElementById('cartCount');
            if (cartCountEl) {
                cartCountEl.textContent = totalItems;
            }
        }
    } catch (error) {
        console.error('Error al cargar el carrito:', error);
    }
}

function toggleMenu() {
    const nav = document.getElementById('mainNav');
    const hamburger = document.querySelector('.hamburger');
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.toggle('active');
        if (cartModal.classList.contains('active')) {
            updateCartDisplay();
        }
    }
}