// Crear el footer dinámicamente con CSS integrado
document.addEventListener('DOMContentLoaded', function() {
    // Insertar CSS en el head
    const styleFooter = document.createElement('style');
    styleFooter.textContent = `
        /* Footer Styles */
        footer {
            background: #1f2937;
            color: white;
            padding: 3rem 2rem 1rem;
            margin-top: 4rem;
        }

        .footer-content {
            max-width: 1400px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h3 {
            margin-bottom: 1rem;
            color: #60a5fa;
        }

        .footer-section p, .footer-section a {
            color: #d1d5db;
            text-decoration: none;
            display: block;
            margin-bottom: 0.5rem;
            transition: color 0.3s ease;
        }

        .footer-section a:hover {
            color: #60a5fa;
        }

        .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
        }

        .social-icons a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: #374151;
            border-radius: 50%;
            transition: all 0.3s ease;
        }

        .social-icons a:hover {
            background: #60a5fa;
            transform: translateY(-3px);
        }

        .newsletter-form {
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        }

        .newsletter-form input {
            flex: 1;
            padding: 0.7rem;
            border: none;
            border-radius: 8px;
            background: #374151;
            color: white;
        }

        .newsletter-form button {
            background: #2855d6;
            color: white;
            border: none;
            padding: 0.7rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .newsletter-form button:hover {
            background: #1e40af;
        }

        .footer-bottom {
            max-width: 1400px;
            margin: 0 auto;
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #374151;
            text-align: center;
            color: #9ca3af;
        }

        @media (max-width: 768px) {
            .footer-content {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(styleFooter);
    
    const footerHTML = `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h3>VideoGamesMVP</h3>
                    <p>La mejor página para comprar videojuegos.</p>
                </div>
                
                <div class="footer-section">
                    <h3>Enlaces rápidos</h3>
                    <a href="index.html">Inicio</a>
                    <a href="index.html">Productos</a>
                    <a href="index.html">Servicios</a>
                    <a href="contacto.html">Contacto</a>
                </div>
                
                <div class="footer-section">
                    <h3>Contacto</h3>
                    <p>
                        <i class="fas fa-map-marker-alt"></i> Calle VideojuegosWP 123
                    </p>
                    <p>
                        <i class="fas fa-phone"></i> +51 74390375
                    </p>
                    <p>
                        <i class="fas fa-envelope"></i> videojuegosmvp@gmail.com
                    </p>
                </div>
                
                <div class="footer-section">
                    <h3>Síguenos</h3>
                    <div class="social-icons">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                        <a href="#"><i class="fab fa-tiktok"></i></a>
                    </div>
                    <div class="newsletter-form">
                        <input type="email" placeholder="Tu email...">
                        <button><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; 2024 VideoGamesMVP. Todos los derechos reservados.</p>
            </div>
        </footer>
    `;
    
    const footerElement = document.getElementById('footer');
    if (footerElement) {
        footerElement.innerHTML = footerHTML;
    }
});